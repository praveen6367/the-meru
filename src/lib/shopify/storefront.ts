import { getShopDomain, getApiVersion } from "./admin";
import type {
  ShopifyGraphQLResponse,
  ShopifyProduct,
  ShopifyCart,
  ShopifyUserError,
} from "./types";

/**
 * Returns the Storefront Access Token from environment.
 * If not set, can fall back to using Admin access token or proxying via server.
 */
export function getStorefrontAccessToken(): string {
  return (
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    ""
  );
}

/**
 * Executes a GraphQL query or mutation against the Shopify Storefront API.
 */
export async function storefrontGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: { cache?: RequestCache; next?: NextFetchRequestConfig } = {}
): Promise<T> {
  const shopDomain = getShopDomain();
  const apiVersion = getApiVersion();
  const token = getStorefrontAccessToken();

  const endpoint = `https://${shopDomain}/api/${apiVersion}/graphql.json`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["X-Shopify-Storefront-Access-Token"] = token;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: options.cache ?? "no-store",
    next: options.next,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Shopify Storefront GraphQL HTTP error [${response.status}]: ${text}`);
  }

  const json = (await response.json()) as ShopifyGraphQLResponse<T>;

  if (json.errors && json.errors.length > 0) {
    throw new Error(
      `Shopify Storefront GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`
    );
  }

  if (!json.data) {
    throw new Error("Shopify Storefront GraphQL response did not contain data.");
  }

  return json.data;
}

// =====================================================================
// STOREFRONT PRODUCT QUERIES
// =====================================================================

const PRODUCT_FRAGMENT = `
  id
  handle
  title
  description
  descriptionHtml
  availableForSale
  tags
  productType
  vendor
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
    maxVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
    maxVariantPrice {
      amount
      currencyCode
    }
  }
  featuredImage {
    url
    altText
    width
    height
  }
  images(first: 10) {
    edges {
      node {
        url
        altText
        width
        height
      }
    }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        availableForSale
        sku
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        image {
          url
          altText
        }
      }
    }
  }
`;

export async function getStorefrontProducts(first: number = 20): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ${PRODUCT_FRAGMENT}
          }
        }
      }
    }
  `;

  try {
    const data = await storefrontGraphQL<{
      products: { edges: { node: ShopifyProduct }[] };
    }>(query, { first });

    return data.products.edges.map((e) => e.node);
  } catch (err) {
    console.warn("[Shopify Storefront] Failed to fetch products:", err);
    return [];
  }
}

export async function getStorefrontProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        ${PRODUCT_FRAGMENT}
      }
    }
  `;

  try {
    const data = await storefrontGraphQL<{
      product: ShopifyProduct | null;
    }>(query, { handle });

    return data.product;
  } catch (err) {
    console.warn(`[Shopify Storefront] Failed to fetch product handle '${handle}':`, err);
    return null;
  }
}

// =====================================================================
// STOREFRONT CART QUERIES & MUTATIONS
// =====================================================================

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions {
              name
              value
            }
            product {
              id
              handle
              title
            }
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export async function createStorefrontCart(
  lines?: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ${CART_FRAGMENT}
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const input: Record<string, unknown> = {};
  if (lines && lines.length > 0) {
    input.lines = lines;
  }

  const data = await storefrontGraphQL<{
    cartCreate: {
      cart: ShopifyCart | null;
      userErrors: ShopifyUserError[];
    };
  }>(query, { input });

  if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
    throw new Error(
      `Cart create error: ${data.cartCreate.userErrors.map((u) => u.message).join(", ")}`
    );
  }

  if (!data.cartCreate.cart) {
    throw new Error("Cart was not returned from Shopify.");
  }

  return data.cartCreate.cart;
}

export async function getStorefrontCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ${CART_FRAGMENT}
      }
    }
  `;

  try {
    const data = await storefrontGraphQL<{
      cart: ShopifyCart | null;
    }>(query, { cartId });

    return data.cart;
  } catch (err) {
    console.warn(`[Shopify Storefront] Failed to get cart ${cartId}:`, err);
    return null;
  }
}

export async function addLinesToStorefrontCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FRAGMENT}
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const data = await storefrontGraphQL<{
    cartLinesAdd: {
      cart: ShopifyCart | null;
      userErrors: ShopifyUserError[];
    };
  }>(query, { cartId, lines });

  if (data.cartLinesAdd.userErrors && data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(
      `Cart lines add error: ${data.cartLinesAdd.userErrors.map((u) => u.message).join(", ")}`
    );
  }

  if (!data.cartLinesAdd.cart) {
    throw new Error("Updated cart was not returned from Shopify.");
  }

  return data.cartLinesAdd.cart;
}

export async function updateStorefrontCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FRAGMENT}
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const data = await storefrontGraphQL<{
    cartLinesUpdate: {
      cart: ShopifyCart | null;
      userErrors: ShopifyUserError[];
    };
  }>(query, { cartId, lines });

  if (data.cartLinesUpdate.userErrors && data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(
      `Cart lines update error: ${data.cartLinesUpdate.userErrors.map((u) => u.message).join(", ")}`
    );
  }

  if (!data.cartLinesUpdate.cart) {
    throw new Error("Updated cart was not returned from Shopify.");
  }

  return data.cartLinesUpdate.cart;
}

export async function removeStorefrontCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${CART_FRAGMENT}
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const data = await storefrontGraphQL<{
    cartLinesRemove: {
      cart: ShopifyCart | null;
      userErrors: ShopifyUserError[];
    };
  }>(query, { cartId, lineIds });

  if (data.cartLinesRemove.userErrors && data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(
      `Cart lines remove error: ${data.cartLinesRemove.userErrors.map((u) => u.message).join(", ")}`
    );
  }

  if (!data.cartLinesRemove.cart) {
    throw new Error("Updated cart was not returned from Shopify.");
  }

  return data.cartLinesRemove.cart;
}
