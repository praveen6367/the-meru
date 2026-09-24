import type { ShopifyGraphQLResponse, ShopifyUserError } from "./types";

/**
 * Normalized Shopify Shop Domain from environment
 */
export function getShopDomain(): string {
  const domain =
    process.env.SHOPIFY_SHOP_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN ||
    "bir7yt-0k.myshopify.com";
  return domain.replace(/^https?:\/\//, "").replace(/\/+$/, "").trim();
}

/**
 * Shopify API Version (defaults to 2026-07 as recommended)
 */
export function getApiVersion(): string {
  return process.env.SHOPIFY_API_VERSION || "2026-07";
}

// In-memory token cache for server-side token management
interface CachedToken {
  accessToken: string;
  expiresAt: number; // Unix epoch ms
  scope?: string;
}

let cachedToken: CachedToken | null = null;
let tokenRefreshPromise: Promise<string> | null = null;

/**
 * Obtains an Admin API access token using client_credentials grant or static token.
 * Automatically caches token and refreshes before expiration.
 */
export async function getAdminAccessToken(): Promise<string> {
  // 1. Check if a static token is provided in environment
  const staticToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  if (staticToken && staticToken.trim().length > 0) {
    return staticToken.trim();
  }

  // 2. Check cached token validity (with 5-minute safety buffer)
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 5 * 60 * 1000) {
    return cachedToken.accessToken;
  }

  // 3. Prevent thundering herd by reusing in-flight refresh promise
  if (tokenRefreshPromise) {
    return tokenRefreshPromise;
  }

  tokenRefreshPromise = (async () => {
    try {
      const shopDomain = getShopDomain();
      const clientId = process.env.SHOPIFY_CLIENT_ID;
      const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        throw new Error(
          "Shopify Admin authentication failed: SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET must be configured."
        );
      }

      const tokenUrl = `https://${shopDomain}/admin/oauth/access_token`;

      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        }),
      });

      if (!response.ok) {
        let errorDetails = "";
        try {
          const errJson = await response.json();
          errorDetails = errJson.error_description || errJson.error || JSON.stringify(errJson);
        } catch {
          errorDetails = await response.text();
        }

        throw new Error(
          `Shopify token exchange failed [HTTP ${response.status}]: ${errorDetails}`
        );
      }

      const data = (await response.json()) as {
        access_token: string;
        scope?: string;
        expires_in?: number;
      };

      if (!data.access_token) {
        throw new Error("Shopify token response did not contain an access_token.");
      }

      // Calculate expiry (default to 24 hours if not provided)
      const expiresInSec = data.expires_in || 86400;
      cachedToken = {
        accessToken: data.access_token,
        expiresAt: Date.now() + expiresInSec * 1000,
        scope: data.scope,
      };

      return cachedToken.accessToken;
    } finally {
      tokenRefreshPromise = null;
    }
  })();

  return tokenRefreshPromise;
}

/**
 * Execute an Admin GraphQL query/mutation with retries and rate limit handling.
 */
export async function adminGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: { retries?: number } = {}
): Promise<T> {
  const { retries = 3 } = options;
  const shopDomain = getShopDomain();
  const apiVersion = getApiVersion();
  const endpoint = `https://${shopDomain}/admin/api/${apiVersion}/graphql.json`;

  let attempt = 0;

  while (attempt <= retries) {
    attempt++;
    const token = await getAdminAccessToken();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      // Handle Rate Limiting (429)
      if (response.status === 429) {
        const retryAfter = parseFloat(response.headers.get("Retry-After") || "2");
        const backoffMs = Math.max(1000, retryAfter * 1000);
        console.warn(`[Shopify Admin] Rate limited. Backing off for ${backoffMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        continue;
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Shopify Admin GraphQL HTTP error [${response.status}]: ${text}`);
      }

      const json = (await response.json()) as ShopifyGraphQLResponse<T>;

      if (json.errors && json.errors.length > 0) {
        const errorMessages = json.errors.map((e) => e.message).join(", ");
        // If throttled via GraphQL extensions cost
        if (errorMessages.toLowerCase().includes("throttled")) {
          const backoff = attempt * 1500;
          console.warn(`[Shopify Admin] GraphQL Throttled. Retrying in ${backoff}ms...`);
          await new Promise((resolve) => setTimeout(resolve, backoff));
          continue;
        }
        throw new Error(`Shopify Admin GraphQL errors: ${errorMessages}`);
      }

      if (!json.data) {
        throw new Error("Shopify Admin GraphQL response did not contain data.");
      }

      return json.data;
    } catch (err: unknown) {
      if (attempt > retries) {
        throw err;
      }
      const backoffMs = attempt * 1000;
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
    }
  }

  throw new Error("Shopify Admin GraphQL request exceeded max retries.");
}

/**
 * Formats userErrors array into a readable string or throws if errors are present.
 */
export function assertNoUserErrors(
  userErrors?: ShopifyUserError[] | null,
  context: string = "Operation"
): void {
  if (userErrors && userErrors.length > 0) {
    const msgs = userErrors
      .map((u) => `${u.field?.join(".") || "error"}: ${u.message}`)
      .join("; ");
    throw new Error(`Shopify UserErrors in ${context}: ${msgs}`);
  }
}
