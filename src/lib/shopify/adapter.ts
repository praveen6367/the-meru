import type { ProductItem, ProductHighlight, ProductAccordionItem } from "../../data/products";
import type { ShopifyProduct } from "./types";

/**
 * Transforms a Shopify Storefront Product into the Next.js ProductItem schema
 * while preserving all luxury design system tokens and rich content.
 */
export function shopifyProductToProductItem(
  shopifyProduct: ShopifyProduct,
  fallbackLocalProduct?: ProductItem
): ProductItem {
  // Extract metafields dictionary
  const metafieldsMap = new Map<string, string>();
  if (shopifyProduct.metafields) {
    for (const m of shopifyProduct.metafields) {
      if (m && m.key && m.value) {
        metafieldsMap.set(m.key, m.value);
      }
    }
  }

  const primaryVariant = shopifyProduct.variants.edges[0]?.node;
  const price = primaryVariant
    ? parseFloat(primaryVariant.price.amount)
    : shopifyProduct.priceRange
    ? parseFloat(shopifyProduct.priceRange.minVariantPrice.amount)
    : fallbackLocalProduct?.price || 0;

  const compareAtPrice = primaryVariant?.compareAtPrice
    ? parseFloat(primaryVariant.compareAtPrice.amount)
    : shopifyProduct.compareAtPriceRange
    ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
    : fallbackLocalProduct?.compareAtPrice || price;

  // Extract images
  const images = shopifyProduct.images.edges.length > 0
    ? shopifyProduct.images.edges.map((e) => ({
        src: e.node.url,
        alt: e.node.altText || shopifyProduct.title,
      }))
    : fallbackLocalProduct?.images || [];

  // Parse rich metafields or use fallback
  let highlights: ProductHighlight[] = fallbackLocalProduct?.highlights || [];
  const rawHighlights = metafieldsMap.get("highlights");
  if (rawHighlights) {
    try {
      highlights = JSON.parse(rawHighlights);
    } catch {
      // fallback
    }
  }

  let accordions: ProductAccordionItem[] = fallbackLocalProduct?.accordions || [];
  const rawAccordions = metafieldsMap.get("accordions");
  if (rawAccordions) {
    try {
      accordions = JSON.parse(rawAccordions);
    } catch {
      // fallback
    }
  }

  const discountPercentage =
    metafieldsMap.get("discount_percentage") ||
    fallbackLocalProduct?.discountPercentage ||
    (compareAtPrice > price
      ? `${Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% OFF`
      : "");

  const isComingSoon =
    fallbackLocalProduct?.isComingSoon ??
    (shopifyProduct.handle !== "the-meru-3-piece-stick-combo-pack");

  const stockStatus = isComingSoon
    ? "Coming Soon"
    : ((metafieldsMap.get("stock_status") as ProductItem["stockStatus"]) ||
      (shopifyProduct.availableForSale ? "In Stock" : "Out of Stock") ||
      fallbackLocalProduct?.stockStatus ||
      "In Stock");

  return {
    id: metafieldsMap.get("nextjs_product_id") || shopifyProduct.handle || shopifyProduct.id,
    slug: shopifyProduct.handle,
    aliases: fallbackLocalProduct?.aliases || [],
    title: shopifyProduct.title,
    subtitle:
      metafieldsMap.get("subtitle") ||
      fallbackLocalProduct?.subtitle ||
      shopifyProduct.productType ||
      "The Meru Sacred Collection",
    price,
    compareAtPrice,
    discountPercentage,
    netQuantity: metafieldsMap.get("net_quantity") || fallbackLocalProduct?.netQuantity || "",
    rating: parseFloat(metafieldsMap.get("rating") || "") || fallbackLocalProduct?.rating || 4.9,
    reviewCount:
      parseInt(metafieldsMap.get("review_count") || "", 10) ||
      fallbackLocalProduct?.reviewCount ||
      150,
    badge: metafieldsMap.get("badge") || fallbackLocalProduct?.badge || discountPercentage,
    images,
    overview:
      shopifyProduct.description ||
      fallbackLocalProduct?.overview ||
      "Sacred handcrafted offering from The Meru.",
    highlights,
    accordions,
    relatedProductSlugs: fallbackLocalProduct?.relatedProductSlugs || [],
    stockStatus,
    isComingSoon,
    sku: primaryVariant?.sku || fallbackLocalProduct?.sku || "",
    shopifyProductId: shopifyProduct.id,
    shopifyVariantId: primaryVariant?.id,
  };
}
