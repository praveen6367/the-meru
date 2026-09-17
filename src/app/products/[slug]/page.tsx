import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs, THE_MERU_PRODUCTS } from "../../../data/products";
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

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Find related products
  const relatedProducts = product.relatedProductSlugs
    .map((rSlug) => getProductBySlug(rSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full overflow-x-hidden">
      {/* Announcement Bar */}
      <Section2 />

      {/* Main Header & Navigation */}
      <HeaderSection />

      {/* Main Product Content */}
      <main id="MainContent" className="flex-1 w-full overflow-x-hidden">
        <ProductView product={product} relatedProducts={relatedProducts} />
      </main>

      {/* The Meru Footer */}
      <FooterNewSection />
    </div>
  );
}
