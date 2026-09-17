"use client";

import Section2 from "./sections/section2";
import HeaderSection from "./sections/header-section";
import Section4 from "./sections/section4";
import BestSellingSection from "./sections/best-selling-section";
import LogoCloudSection from "./sections/logo-cloud-section";
import VideoNewTwSection from "./sections/video-new-tw-section";
import ProductGridSection from "./sections/product-grid-section";
import AsSeenInSection from "./sections/as-seen-in-section";
import TwTextBannerSection from "./sections/tw-text-banner-section";
import PhoolFlowercyclingProcessSection from "./sections/phool-flowercycling-process-section";
import GeethaVaradanSection from "./sections/geetha-varadan-section";
import CtaSection from "./sections/cta-section";
import FooterNewSection from "./sections/footer-new-section";
import MediaTile, { type MediaTileData } from "./components/media-tile";
import { MediaTile_styles } from "./_styles";

const MediaTile_data: MediaTileData[] = [
  {
    href: "/collections/mukhwas",
    alt: "Mukhwas",
    height: "150",
    imgSrc: "",
    srcSet: "",
    width: "150",
    description: "Mukhwas",
    tag: "ROYAL DIGESTIVE",
    categoryType: "mukhwas",
  },
  {
    href: "/collections/dhoop-bati",
    alt: "Dhoop Bati",
    height: "150",
    imgSrc: "",
    srcSet: "",
    width: "150",
    description: "Dhoop Bati",
    tag: "✦ SACRED RITUAL ✦",
    isFeatured: true,
    categoryType: "dhoop-bati",
  },
  {
    href: "/collections/mouth-freshener",
    alt: "Mouth Freshener",
    height: "150",
    imgSrc: "",
    srcSet: "",
    width: "150",
    description: "Mouth Freshener",
    tag: "HERBAL REFRESH",
    categoryType: "mouth-freshener",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full overflow-x-hidden">
      {/* Top Announcement / Promo Bar */}
      <Section2 />

      {/* Main Header & Navigation */}
      <HeaderSection />

      {/* Main Page Content */}
      <main className="flex-1 w-full overflow-x-hidden" id="MainContent">
        {/* Main Hero Banner */}
        <Section4 />

        {/* Featured Category Collections - The Meru Luxury Collection Stories */}
        {/* Compact Collection Navigation Strip */}
        <section
          className="w-full bg-[#F8F4EB] py-6 sm:py-7 md:py-8 border-b border-deep-charcoal/10"
          id="shopify-section-collection_category_list_Aw4QGW"
        >
          <div className="max-w-5xl mx-auto px-1 xs:px-3 sm:px-10 md:px-12">
            <ul className="flex justify-center items-start gap-1 xs:gap-3 sm:gap-10 md:gap-20 lg:gap-28 py-1 [list-style-type:none]">
              {MediaTile_data.map((d, i) => (
                <MediaTile
                  key={i}
                  d={d}
                  index={i}
                  styles={MediaTile_styles[i] || { className: "" }}
                />
              ))}
            </ul>
          </div>
        </section>

        {/* Best Selling Products Carousel */}
        <section
          className="w-full bg-surface-2"
          id="shopify-section-165769448781d7dc80"
        >
          <div className="w-full bg-clr-3 py-4" id="newBestSliderWrapper-165769448781d7dc80">
            <BestSellingSection />
            <LogoCloudSection />
          </div>
        </section>

        {/* Mission & Brand Video Section */}
        <VideoNewTwSection />

        {/* Collections & Categories Grid (Temporarily removed) */}
        {/* <ProductGridSection /> */}

        {/* Why Choose Phool (Key Impact Metrics) */}
        <AsSeenInSection />

        {/* Brand Purpose Banner */}
        <TwTextBannerSection />

        {/* Phool Flowercycling Process */}
        <PhoolFlowercyclingProcessSection />

        {/* Customer Experiences & Reviews - Editorial Testimonial Experience */}
        <section
          className="w-full bg-[#FAF8F5] border-y border-deep-charcoal/8 py-14 sm:py-16 md:py-20 overflow-hidden"
          id="shopify-section-1658756054ba8c44da"
        >
          <GeethaVaradanSection />
        </section>

        {/* Newsletter Signup CTA */}
        <CtaSection />
      </main>

      {/* Footer */}
      <FooterNewSection />
    </div>
  );
}
