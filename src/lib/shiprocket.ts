/**
 * Shiprocket / Fastrr Headless 1-Click Checkout Integration
 * Documentation: Custom Frontend + Shopify Backend & Mobile App WebView
 */

export interface ShiprocketProduct {
  variantId: string;
  quantity: number;
}

export interface ShiprocketBuyDirectOptions {
  type: "cart" | "product";
  products: ShiprocketProduct[];
  couponCode?: string;
  utmParams?: string;
  cartAttributes?: Record<string, string>;
}

export interface MobileAppCheckoutItem {
  id?: number | string;
  quantity: number;
  variant_id?: number | string;
  variantId?: number | string;
  variantTitle?: string;
  key?: string;
  title: string;
  price: number;
  sku?: string;
  product_id?: number | string;
  productId?: number | string;
  url?: string;
  image?: string;
  Image?: string;
}

export interface MobileAppCheckoutOptions {
  items: MobileAppCheckoutItem[];
  domain: string;
  couponCode?: string;
  utmParams?: string;
  cartAttributes?: Record<string, string>;
}

export interface MobileAppLoginOptions {
  ck: string;
  cs: string;
  domain: string;
}

declare global {
  interface Window {
    shiprocketCheckoutEvents?: {
      buyDirect: (options: ShiprocketBuyDirectOptions) => void;
      [key: string]: any;
    };
    getOneClickCheckoutUrl?: (options: MobileAppCheckoutOptions) => string;
    getOneclickLoginUrl?: (options: MobileAppLoginOptions) => string;
  }
}

/**
 * Returns the configured seller domain for Shiprocket / Fastrr checkout
 */
export function getSellerDomain(): string {
  if (typeof document !== "undefined") {
    const input = document.getElementById("sellerDomain") as HTMLInputElement | null;
    if (input && input.value) return input.value.trim();
  }
  return (
    process.env.NEXT_PUBLIC_SELLER_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN ||
    "bir7yt-0k.myshopify.com"
  );
}

export interface InitiateCheckoutItem {
  variantId?: string | number;
  merchandiseId?: string;
  id?: string | number;
  title?: string;
  price?: number;
  quantity: number;
  image?: string;
}

export interface InitiateCheckoutParams {
  type: "cart" | "product";
  products: InitiateCheckoutItem[];
  couponCode?: string;
  utmParams?: string;
  cartAttributes?: Record<string, string>;
  onFallback?: () => Promise<void> | void;
}

/**
 * Initiates checkout through Shiprocket / Fastrr buyDirect,
 * with graceful fallback to MobileApp WebView getOneClickCheckoutUrl or direct Shopify cart.
 */
export async function initiateShiprocketCheckout(
  params: InitiateCheckoutParams
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  // Clean and extract numeric variant IDs for Shiprocket
  const shiprocketProducts: ShiprocketProduct[] = params.products.map((p) => {
    const raw = String(p.variantId || p.merchandiseId || p.id || "50623227920632");
    const numericId = raw.includes("/") ? raw.split("/").pop()! : raw;
    return {
      variantId: numericId,
      quantity: Math.max(1, p.quantity || 1),
    };
  });

  const domain = getSellerDomain();

  // 1. Primary: shiprocketCheckoutEvents.buyDirect
  if (window.shiprocketCheckoutEvents && typeof window.shiprocketCheckoutEvents.buyDirect === "function") {
    try {
      console.log("[Shiprocket Checkout] Triggering buyDirect:", {
        type: params.type,
        products: shiprocketProducts,
      });

      const payload: ShiprocketBuyDirectOptions = {
        type: params.type,
        products: shiprocketProducts,
      };

      if (params.couponCode) payload.couponCode = params.couponCode;
      if (params.utmParams) payload.utmParams = params.utmParams;
      if (params.cartAttributes) payload.cartAttributes = params.cartAttributes;

      window.shiprocketCheckoutEvents.buyDirect(payload);
      return true;
    } catch (err) {
      console.error("[Shiprocket Checkout] buyDirect invocation failed:", err);
    }
  }

  // 2. Mobile App WebView Fallback: window.getOneClickCheckoutUrl
  if (typeof window.getOneClickCheckoutUrl === "function") {
    try {
      const items: MobileAppCheckoutItem[] = params.products.map((p) => {
        const raw = String(p.variantId || p.merchandiseId || p.id || "50623227920632");
        const numericId = raw.includes("/") ? raw.split("/").pop()! : raw;
        return {
          id: numericId,
          variantId: numericId,
          variant_id: numericId,
          productId: numericId,
          product_id: numericId,
          title: p.title || "The Meru Ritual Item",
          price: p.price ? Math.round(p.price * 100) : 29900,
          quantity: Math.max(1, p.quantity || 1),
          image: p.image || "",
          Image: p.image || "",
        };
      });

      const checkoutUrl = window.getOneClickCheckoutUrl({
        items,
        domain,
        ...(params.couponCode ? { couponCode: params.couponCode } : {}),
        ...(params.utmParams ? { utmParams: params.utmParams } : {}),
        ...(params.cartAttributes ? { cartAttributes: params.cartAttributes } : {}),
      });

      if (checkoutUrl) {
        console.log("[Shiprocket Checkout] Redirecting to Fastrr OneClick URL:", checkoutUrl);
        window.location.href = checkoutUrl;
        return true;
      }
    } catch (err) {
      console.error("[Shiprocket Checkout] getOneClickCheckoutUrl failed:", err);
    }
  }

  // 3. Fallback handler (Shopify Storefront API or Cart Permalink)
  if (params.onFallback) {
    await params.onFallback();
  }

  return false;
}

/**
 * Mobile App Login Webview Helper
 * Generates OneClick login URL using client key (ck), client secret (cs), and domain
 */
export function getFastrrMobileLoginUrl(options: {
  ck: string;
  cs: string;
  domain?: string;
}): string | null {
  if (typeof window === "undefined" || typeof window.getOneclickLoginUrl !== "function") {
    return null;
  }
  const domain = options.domain || getSellerDomain();
  try {
    return window.getOneclickLoginUrl({
      ck: options.ck,
      cs: options.cs,
      domain,
    });
  } catch (err) {
    console.error("[Shiprocket Checkout] getOneclickLoginUrl failed:", err);
    return null;
  }
}
