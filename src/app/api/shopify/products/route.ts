import { NextRequest, NextResponse } from "next/server";
import {
  getStorefrontProducts,
  getStorefrontProductByHandle,
} from "../../../../lib/shopify/storefront";
import { adminGraphQL } from "../../../../lib/shopify/admin";
import type { ShopifyProduct } from "../../../../lib/shopify/types";

const ADMIN_PRODUCTS_QUERY = `
  query getAdminProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          productType
          vendor
          tags
          media(first: 10) {
            edges {
              node {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
                sku
              }
            }
          }
          metafields(first: 20) {
            edges {
              node {
                namespace
                key
                value
              }
            }
          }
        }
      }
    }
  }
`;

function mapAdminProductToStorefrontProduct(adminNode: any): ShopifyProduct {
  const images = (adminNode.media?.edges || [])
    .filter((e: any) => e.node?.image?.url)
    .map((e: any) => ({
      node: {
        url: e.node.image.url,
        altText: e.node.image.altText || adminNode.title,
        width: e.node.image.width,
        height: e.node.image.height,
      },
    }));

  const variants = (adminNode.variants?.edges || []).map((e: any) => ({
    node: {
      id: e.node.id,
      title: e.node.title,
      availableForSale: true,
      price: { amount: e.node.price, currencyCode: "INR" },
      compareAtPrice: e.node.compareAtPrice
        ? { amount: e.node.compareAtPrice, currencyCode: "INR" }
        : null,
      sku: e.node.sku,
    },
  }));

  const metafields = (adminNode.metafields?.edges || []).map((e: any) => e.node);

  return {
    id: adminNode.id,
    handle: adminNode.handle,
    title: adminNode.title,
    description: adminNode.description || "",
    descriptionHtml: adminNode.descriptionHtml,
    availableForSale: true,
    tags: adminNode.tags || [],
    productType: adminNode.productType || "",
    vendor: adminNode.vendor || "The Meru",
    images: { edges: images },
    variants: { edges: variants },
    metafields,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get("handle");

    if (handle) {
      let product: ShopifyProduct | null = null;
      try {
        product = await getStorefrontProductByHandle(handle);
      } catch {
        // Fallback to Admin API
      }

      if (!product) {
        // Query Admin API for product by handle
        const adminData = await adminGraphQL<{
          products: { edges: { node: any }[] };
        }>(
          `query findByHandle($query: String!) {
            products(first: 1, query: $query) {
              edges {
                node {
                  id
                  handle
                  title
                  description
                  descriptionHtml
                  productType
                  vendor
                  tags
                  media(first: 10) {
                    edges {
                      node {
                        ... on MediaImage {
                          image {
                            url
                            altText
                            width
                            height
                          }
                        }
                      }
                    }
                  }
                  variants(first: 20) {
                    edges {
                      node {
                        id
                        title
                        price
                        compareAtPrice
                        sku
                      }
                    }
                  }
                  metafields(first: 20) {
                    edges {
                      node {
                        namespace
                        key
                        value
                      }
                    }
                  }
                }
              }
            }
          }`,
          { query: `handle:${handle}` }
        );

        const found = adminData.products.edges[0]?.node;
        if (found) {
          product = mapAdminProductToStorefrontProduct(found);
        }
      }

      if (!product) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, product });
    }

    // List all products
    const first = parseInt(searchParams.get("first") || "20", 10);
    let products: ShopifyProduct[] = [];

    try {
      products = await getStorefrontProducts(first);
    } catch {
      // Fallback
    }

    if (products.length === 0) {
      // Query Admin API fallback
      const adminData = await adminGraphQL<{
        products: { edges: { node: any }[] };
      }>(ADMIN_PRODUCTS_QUERY, { first });

      products = adminData.products.edges.map((e) =>
        mapAdminProductToStorefrontProduct(e.node)
      );
    }

    return NextResponse.json({ success: true, products });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
