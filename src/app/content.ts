// Semantic page content extracted from recognized recipe sections.

export type MediaTileDataItem = {
  href: string;
  alt: string;
  height: string;
  imgSrc: string;
  srcSet: string;
  width: string;
  description: string;
};
export const mediaTileData: MediaTileDataItem[] = [
    { href: "/collections/rakhi", alt: "Vrinda Collection", height: "1254", imgSrc: "/assets/cloned/images/778ce81f3158.png", srcSet: "/assets/cloned/images/26546f5e4c76.png 100w", width: "1254", description: "Vrinda Collection" },
    { href: "/collections/diwali", alt: "Diwali Collection 2026", height: "500", imgSrc: "/assets/cloned/images/edc5bfe9b64d.png", srcSet: "/assets/cloned/images/63a45552eaa1.png 100w", width: "500", description: "Diwali Collection 2026" },
    { href: "/collections/phal-by-phool", alt: "Phal By Phool", height: "500", imgSrc: "/assets/cloned/images/4054ac677a80.png", srcSet: "/assets/cloned/images/9875273fd5c8.png 100w", width: "500", description: "Phal By Phool" }
];

export type LogosItem = {
  imgSrc: string;
};
export const logos: LogosItem[] = [
    { imgSrc: "/assets/cloned/svg/b7ceb996b3d1.svg" },
    { imgSrc: "/assets/cloned/svg/f358a815f9ea.svg" },
    { imgSrc: "/assets/cloned/svg/e2cfe6bec6c1.svg" }
];

export type Logos2Item = {
  imgSrc: string;
};
export const logos2: Logos2Item[] = [
    { imgSrc: "/assets/cloned/svg/fc61de850fb6.svg" },
    { imgSrc: "/assets/cloned/svg/60ff51ad391e.svg" },
    { imgSrc: "/assets/cloned/svg/7ebe917a67be.svg" }
];

export type ProductsItem = {
  href: string;
  alt: string;
  imgSrc: string;
  title: string;
};
export const products: ProductsItem[] = [
    { href: "/collections/diwali", alt: "Phool Swarna Ramayana Frame Diwali Gift Box", imgSrc: "/assets/cloned/images/a11d543e26d7.webp", title: "Diwali Collection 2026" },
    { href: "/collections/banke-bihari-collection", alt: "Phool Madhuvan Incense Sticks", imgSrc: "/assets/cloned/images/f7d7179e60f0.webp", title: "Banke Bihari Collection" },
    { href: "/collections/phal-by-phool", alt: "Phool 3-in-1 Pineapple, Strawberry & Lychee Incense Sticks", imgSrc: "/assets/cloned/images/3241a95c1935.jpg", title: "Phal By Phool" },
    { href: "/collections/car-fresheners", alt: "Phool Car Freshener – Modern Dusk", imgSrc: "/assets/cloned/images/68539b987957.webp", title: "Car Fresheners" },
    { href: "/collections/new-launches", alt: "Phool DEET-Free Mosquito Repellent Room Spray", imgSrc: "/assets/cloned/images/29fccce7c105.webp", title: "Mosquito Repellents" },
    { href: "/collections/bambooless-incense-sticks", alt: "Phool Badrinath Kesar Chandan Bambooless Incense Sticks", imgSrc: "/assets/cloned/images/f2017dad622b.webp", title: "Bambooless Incense Sticks" }
];

export type TileDataItem = {
  href: string;
  label: string;
  imgSrc?: string;
};
export const tileData: TileDataItem[] = [
    { href: "/collections/incense-sticks", label: "Incense Sticks", imgSrc: "/assets/cloned/images/6d1c2fa96750.webp" },
    { href: "/collections/incense-cones", label: "Incense Cones", imgSrc: "/assets/cloned/images/0cf58b803a65.webp" },
    { href: "/collections/refill-packs", label: "Refill Packs", imgSrc: "/assets/cloned/images/991eca7c9252.webp" },
    { href: "/collections/havan-cups", label: "Havan Cups", imgSrc: "/assets/cloned/images/809cba9dd81d.webp" },
    { href: "/collections/candles", label: "Candles", imgSrc: "/assets/cloned/images/658b91558a55.webp" },
    { href: "/collections/essential-oils", label: "Essential Oils", imgSrc: "/assets/cloned/images/02b86d6b5b3c.webp" }
];

export type ListRowDataItem = {
  href: string;
  label: string;
};
export const listRowData: ListRowDataItem[] = [
    { href: "/pages/our-story", label: "Our Story" },
    { href: "/pages/team", label: "Team" },
    { href: "/pages/shipping-1", label: "Shipping Queries" },
    { href: "/pages/blogs", label: "Blog" }
];

export type ListRowData2Item = {
  href: string;
  label: string;
};
export const listRowData2: ListRowData2Item[] = [
    { href: "/pages/privacy-policy", label: "Privacy Policy" },
    { href: "/pages/terms-of-use", label: "Terms of Use" },
    { href: "/pages/contact-us", label: "Career" },
    { href: "/pages/contact-us", label: "Contact Us" },
    { href: "/pages/docs", label: "Docs" }
];

