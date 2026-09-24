export interface ShopifyConfig {
  shopDomain: string;
  clientId?: string;
  clientSecret?: string;
  storefrontAccessToken?: string;
  apiVersion: string;
}

export interface ShopifyImage {
  id?: string;
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice | null;
  sku?: string | null;
  image?: ShopifyImage | null;
}

export interface ShopifyMetafield {
  id?: string;
  namespace: string;
  key: string;
  value: string;
  type?: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  priceRange?: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  featuredImage?: ShopifyImage | null;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
  metafields?: (ShopifyMetafield | null)[];
  tags?: string[];
  productType?: string;
  vendor?: string;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount?: ShopifyPrice;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions?: {
      name: string;
      value: string;
    }[];
    product: {
      id: string;
      handle: string;
      title: string;
    };
    image?: ShopifyImage | null;
    price: ShopifyPrice;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
    totalTaxAmount?: ShopifyPrice | null;
  };
  lines: {
    edges: {
      node: ShopifyCartLine;
    }[];
  };
}

export interface ShopifyUserError {
  field?: string[];
  message: string;
  code?: string;
}

export interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: {
    message: string;
    locations?: { line: number; column: number }[];
    path?: string[];
    extensions?: Record<string, unknown>;
  }[];
  extensions?: {
    cost?: {
      requestedQueryCost: number;
      actualQueryCost: number;
      throttleStatus: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
}
