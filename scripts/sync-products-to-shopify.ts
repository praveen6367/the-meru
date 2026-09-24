import fs from "fs";
import path from "path";
import { THE_MERU_PRODUCTS, ProductItem } from "../src/data/products";
import {
  getShopDomain,
  getApiVersion,
  adminGraphQL,
  assertNoUserErrors,
  getAdminAccessToken,
} from "../src/lib/shopify/admin";
import type { ShopifyUserError } from "../src/lib/shopify/types";

// Load environment variables from .env.local and .env
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

interface SyncResult {
  title: string;
  slug: string;
  status: "CREATED" | "UPDATED" | "SKIPPED" | "FAILED";
  shopifyId?: string;
  error?: string;
  userErrors?: ShopifyUserError[];
}

/**
 * Upload a local image file using Shopify's stagedUploadsCreate API
 */
async function uploadLocalImageToShopify(
  localRelPath: string,
  altText: string
): Promise<string | null> {
  try {
    // Strip leading slash
    const cleanPath = localRelPath.startsWith("/") ? localRelPath.slice(1) : localRelPath;
    const fullPath = path.resolve(process.cwd(), "public", cleanPath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`[Sync] Local image not found at: ${fullPath}`);
      return null;
    }

    const fileBuffer = fs.readFileSync(fullPath);
    const fileName = path.basename(fullPath);
    const ext = path.extname(fullPath).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
        ? "image/webp"
        : ext === ".gif"
        ? "image/gif"
        : "image/jpeg";

    // 1. Stage the upload via Admin GraphQL
    const stageMutation = `
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters {
              name
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const stageData = await adminGraphQL<{
      stagedUploadsCreate: {
        stagedTargets: {
          url: string;
          resourceUrl: string;
          parameters: { name: string; value: string }[];
        }[];
        userErrors: ShopifyUserError[];
      };
    }>(stageMutation, {
      input: [
        {
          filename: fileName,
          mimeType,
          resource: "IMAGE",
          httpMethod: "POST",
        },
      ],
    });

    assertNoUserErrors(stageData.stagedUploadsCreate.userErrors, "stagedUploadsCreate");

    const target = stageData.stagedUploadsCreate.stagedTargets[0];
    if (!target) {
      throw new Error("No staged target returned from Shopify.");
    }

    // 2. Upload file buffer to staged target using FormData
    const formData = new FormData();
    for (const param of target.parameters) {
      formData.append(param.name, param.value);
    }
    const blob = new Blob([fileBuffer], { type: mimeType });
    formData.append("file", blob, fileName);

    const uploadRes = await fetch(target.url, {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`Failed to upload to staged target [HTTP ${uploadRes.status}]: ${errText}`);
    }

    return target.resourceUrl;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[Sync] Failed to stage upload for ${localRelPath}:`, msg);
    return null;
  }
}

/**
 * Find an existing product by metafield, SKU, or handle
 */
async function findExistingProduct(product: ProductItem): Promise<{
  id: string;
  handle: string;
  variantId?: string;
} | null> {
  const query = `
    query findProduct($query: String!) {
      products(first: 5, query: $query) {
        edges {
          node {
            id
            handle
            variants(first: 5) {
              edges {
                node {
                  id
                  sku
                }
              }
            }
          }
        }
      }
    }
  `;

  // Search by handle
  const res = await adminGraphQL<{
    products: {
      edges: {
        node: {
          id: string;
          handle: string;
          variants: { edges: { node: { id: string; sku: string } }[] };
        };
      }[];
    };
  }>(query, { query: `handle:${product.slug}` });

  const match = res.products.edges.find((e) => e.node.handle === product.slug);
  if (match) {
    return {
      id: match.node.id,
      handle: match.node.handle,
      variantId: match.node.variants.edges[0]?.node.id,
    };
  }

  // Fallback: search by SKU
  if (product.sku) {
    const skuRes = await adminGraphQL<{
      products: {
        edges: {
          node: {
            id: string;
            handle: string;
            variants: { edges: { node: { id: string; sku: string } }[] };
          };
        }[];
      };
    }>(query, { query: `sku:${product.sku}` });

    const skuMatch = skuRes.products.edges[0];
    if (skuMatch) {
      return {
        id: skuMatch.node.id,
        handle: skuMatch.node.handle,
        variantId: skuMatch.node.variants.edges[0]?.node.id,
      };
    }
  }

  return null;
}

/**
 * Synchronize a single product from Next.js data into Shopify
 */
async function syncProduct(product: ProductItem): Promise<SyncResult> {
  try {
    const existing = await findExistingProduct(product);

    // Prepare metafields
    const metafields = [
      {
        namespace: "custom",
        key: "nextjs_product_id",
        value: product.id,
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "subtitle",
        value: product.subtitle,
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "net_quantity",
        value: product.netQuantity,
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "discount_percentage",
        value: product.discountPercentage,
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "badge",
        value: product.badge,
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "rating",
        value: product.rating.toString(),
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "review_count",
        value: product.reviewCount.toString(),
        type: "number_integer",
      },
      {
        namespace: "custom",
        key: "stock_status",
        value: product.stockStatus,
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "highlights",
        value: JSON.stringify(product.highlights),
        type: "json",
      },
      {
        namespace: "custom",
        key: "accordions",
        value: JSON.stringify(product.accordions),
        type: "json",
      },
    ];

    // Upload local images
    console.log(`[Sync] Uploading ${product.images.length} images for ${product.title}...`);
    const mediaToCreate: { originalSource: string; mediaContentType: "IMAGE"; alt: string }[] = [];

    for (const img of product.images) {
      const stagedUrl = await uploadLocalImageToShopify(img.src, img.alt);
      if (stagedUrl) {
        mediaToCreate.push({
          originalSource: stagedUrl,
          mediaContentType: "IMAGE",
          alt: img.alt || product.title,
        });
      }
    }

    if (existing) {
      // UPDATE EXISTING PRODUCT
      console.log(`[Sync] Updating existing product ${product.title} (${existing.id})...`);

      const updateMutation = `
        mutation productUpdate($input: ProductInput!) {
          productUpdate(input: $input) {
            product {
              id
              handle
              title
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const updateRes = await adminGraphQL<{
        productUpdate: {
          product: { id: string; handle: string; title: string } | null;
          userErrors: ShopifyUserError[];
        };
      }>(updateMutation, {
        input: {
          id: existing.id,
          title: product.title,
          descriptionHtml: `<p>${product.overview}</p>`,
          vendor: "The Meru",
          productType: product.subtitle.includes("Dhoop") ? "Incense" : "Mukhwas",
          tags: ["The Meru", product.stockStatus, product.badge].filter(Boolean),
          metafields,
        },
      });

      if (updateRes.productUpdate.userErrors.length > 0) {
        return {
          title: product.title,
          slug: product.slug,
          status: "FAILED",
          shopifyId: existing.id,
          userErrors: updateRes.productUpdate.userErrors,
          error: updateRes.productUpdate.userErrors.map((u) => u.message).join(", "),
        };
      }

      // Update variant price, compareAtPrice, and SKU using modern productVariantsBulkUpdate
      if (existing.variantId) {
        const variantBulkMutation = `
          mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
            productVariantsBulkUpdate(productId: $productId, variants: $variants) {
              productVariants {
                id
                price
                compareAtPrice
                sku
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        await adminGraphQL(variantBulkMutation, {
          productId: existing.id,
          variants: [
            {
              id: existing.variantId,
              price: product.price.toFixed(2),
              compareAtPrice: product.compareAtPrice.toFixed(2),
              inventoryItem: {
                sku: product.sku,
              },
            },
          ],
        });
      }

      return {
        title: product.title,
        slug: product.slug,
        status: "UPDATED",
        shopifyId: existing.id,
      };
    } else {
      // CREATE NEW PRODUCT
      console.log(`[Sync] Creating new product: ${product.title}...`);

      const createMutation = `
        mutation productCreate($input: ProductInput!, $media: [CreateMediaInput!]) {
          productCreate(input: $input, media: $media) {
            product {
              id
              handle
              title
              variants(first: 5) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const createRes = await adminGraphQL<{
        productCreate: {
          product: {
            id: string;
            handle: string;
            title: string;
            variants: { edges: { node: { id: string } }[] };
          } | null;
          userErrors: ShopifyUserError[];
        };
      }>(createMutation, {
        input: {
          title: product.title,
          handle: product.slug,
          descriptionHtml: `<p>${product.overview}</p>`,
          vendor: "The Meru",
          productType: product.subtitle.includes("Dhoop") ? "Incense" : "Mukhwas",
          tags: ["The Meru", product.stockStatus, product.badge].filter(Boolean),
          metafields,
        },
        media: mediaToCreate.length > 0 ? mediaToCreate : undefined,
      });

      if (createRes.productCreate.userErrors.length > 0) {
        return {
          title: product.title,
          slug: product.slug,
          status: "FAILED",
          userErrors: createRes.productCreate.userErrors,
          error: createRes.productCreate.userErrors.map((u) => u.message).join(", "),
        };
      }

      const createdProduct = createRes.productCreate.product;
      const variantId = createdProduct?.variants.edges[0]?.node.id;

      // Update variant price, compareAtPrice, SKU using modern productVariantsBulkUpdate
      if (variantId && createdProduct?.id) {
        const variantBulkMutation = `
          mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
            productVariantsBulkUpdate(productId: $productId, variants: $variants) {
              productVariants {
                id
                price
                compareAtPrice
                sku
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        await adminGraphQL(variantBulkMutation, {
          productId: createdProduct.id,
          variants: [
            {
              id: variantId,
              price: product.price.toFixed(2),
              compareAtPrice: product.compareAtPrice.toFixed(2),
              inventoryItem: {
                sku: product.sku,
              },
            },
          ],
        });
      }

      return {
        title: product.title,
        slug: product.slug,
        status: "CREATED",
        shopifyId: createdProduct?.id,
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      title: product.title,
      slug: product.slug,
      status: "FAILED",
      error: errorMsg,
    };
  }
}

/**
 * Main execution runner
 */
async function main() {
  console.log("====================================================");
  console.log("SHOPIFY PRODUCT SYNCHRONIZATION PROCESS");
  console.log("====================================================");
  console.log(`Target Shop: https://${getShopDomain()}`);
  console.log(`API Version: ${getApiVersion()}`);
  console.log(`Total Products in Codebase: ${THE_MERU_PRODUCTS.length}`);
  console.log("----------------------------------------------------");

  // Verify access token acquisition
  console.log("[Auth] Verifying Shopify Admin API connection...");
  try {
    await getAdminAccessToken();
    console.log("[Auth] ✓ Successfully connected to Shopify Admin API.");
  } catch (err: unknown) {
    console.error("[Auth] ✗ Failed to authenticate with Shopify Admin API:");
    console.error(err instanceof Error ? err.message : String(err));
    console.log("\n[Notice] Please ensure the app is installed on the store.");
    console.log("Install link: https://admin.shopify.com/store/" + getShopDomain().replace(".myshopify.com", "") + "/oauth/install?client_id=" + (process.env.SHOPIFY_CLIENT_ID || ""));
    process.exit(1);
  }

  const results: SyncResult[] = [];

  for (const product of THE_MERU_PRODUCTS) {
    console.log(`\nProcessing: ${product.title} (SKU: ${product.sku})...`);
    const res = await syncProduct(product);
    results.push(res);
    console.log(`Result: [${res.status}] ${res.error || res.shopifyId || "OK"}`);
  }

  console.log("\n====================================================");
  console.log("FINAL SYNCHRONIZATION REPORT");
  console.log("====================================================");
  const created = results.filter((r) => r.status === "CREATED").length;
  const updated = results.filter((r) => r.status === "UPDATED").length;
  const skipped = results.filter((r) => r.status === "SKIPPED").length;
  const failed = results.filter((r) => r.status === "FAILED").length;

  console.log(`Total Processed: ${results.length}`);
  console.log(`Created:        ${created}`);
  console.log(`Updated:        ${updated}`);
  console.log(`Skipped:        ${skipped}`);
  console.log(`Failed:         ${failed}`);
  console.log("----------------------------------------------------");

  if (failed > 0) {
    console.log("FAILURES:");
    for (const f of results.filter((r) => r.status === "FAILED")) {
      console.log(`- Product: ${f.title}`);
      console.log(`  Error:   ${f.error}`);
      if (f.userErrors && f.userErrors.length > 0) {
        console.log(`  UserErrors: ${JSON.stringify(f.userErrors)}`);
      }
    }
  } else {
    console.log("✓ All products successfully synchronized with Shopify!");
  }
  console.log("====================================================\n");
}

main().catch((err) => {
  console.error("Fatal error during sync:", err);
  process.exit(1);
});
