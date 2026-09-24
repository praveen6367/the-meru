import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs, ProductItem } from "../../../data/products";
import { getStorefrontProductByHandle } from "../../../lib/shopify/storefront";
import { adminGraphQL } from "../../../lib/shopify/admin";
import { shopifyProductToProductItem } from "../../../lib/shopify/adapter";
import type { ShopifyProduct } from "../../../lib/shopify/types";
import ProductView from "./product-view";
import Section2 from "../../sections/section2";
import HeaderSection from "../../sections/header-section";
import FooterNewSection from "../../sections/footer-new-section";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

async function resolveProduct(slug: string): Promise<ProductItem | null> {
  const localFallback = getProductBySlug(slug);

  // 1. Try Storefront API
  try {
    const shopifyProduct = await getStorefrontProductByHandle(slug);
    if (shopifyProduct) {
      return shopifyProductToProductItem(shopifyProduct, localFallback);
    }
  } catch {
    // Continue to Admin API
  }

  // 2. Try Admin API
  try {
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
              media(first: 10) {
                edges {
                  node {
                    ... on MediaImage {
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
              variants(first: 10) {
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
      { query: `handle:${slug}` }
    );

    const found = adminData.products.edges[0]?.node;
    if (found) {
      const shopifyProd: ShopifyProduct = {
        id: found.id,
        handle: found.handle,
        title: found.title,
        description: found.description || "",
        availableForSale: true,
        images: {
          edges: (found.media?.edges || [])
            .filter((e: any) => e.node?.image?.url)
            .map((e: any) => ({
              node: {
                url: e.node.image.url,
                altText: e.node.image.altText || found.title,
              },
            })),
        },
        variants: {
          edges: (found.variants?.edges || []).map((e: any) => ({
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
          })),
        },
        metafields: (found.metafields?.edges || []).map((e: any) => e.node),
      };

      return shopifyProductToProductItem(shopifyProd, localFallback);
    }
  } catch {
    // Continue to local fallback
  }

  return localFallback || null;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | The Meru",
      description: "The requested sacred offering could not be found.",
    };
  }

  return {
    title: `${product.title} | The Meru Sanctuary`,
    description: product.overview.slice(0, 160),
    openGraph: {
      title: `${product.title} | The Meru`,
      description: product.overview.slice(0, 160),
      images: [
        {
          url: product.images[0]?.src || "/assets/cloned/Logo.jpeg",
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | The Meru`,
      description: product.overview.slice(0, 160),
      images: [product.images[0]?.src || "/assets/cloned/Logo.jpeg"],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await resolveProduct(slug);

  if (!product) {
    notFound();
  }

  // Find related products
  const relatedProductsPromises = product.relatedProductSlugs.map((rSlug) =>
    resolveProduct(rSlug)
  );
  const relatedResults = await Promise.all(relatedProductsPromises);
  const relatedProducts = relatedResults.filter((p): p is ProductItem => Boolean(p));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full overflow-x-clip">
      {/* Top Announcement / Promo Bar */}
      <Section2 />

      {/* Main Header & Navigation */}
      <HeaderSection />

      {/* Main Product Content */}
      <main id="MainContent" className="flex-1 w-full overflow-x-clip">
        <ProductView product={product} relatedProducts={relatedProducts} />
      </main>

      {/* The Meru Footer */}
      <FooterNewSection />
    </div>
  );
}
