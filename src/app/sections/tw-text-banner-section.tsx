import { LinkButton } from "../../design-system/components/Button";

/**
 * Tw Text Banner section - Our Purpose.
 * Full-width atmospheric background banner featuring The Meru artisan woman
 * sorting sacred temple flowers, with an elegant left-side faded whitish/ivory
 * gradient overlay for maximum text contrast and an unobstructed view of the
 * clear artisan image on the right.
 */
export default function TwTextBannerSection() {
  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px] sm:min-h-[540px] md:min-h-[600px] lg:min-h-[640px] flex items-center bg-[#F8F4EB] border-b border-[#E9DDC9]/50"
      id="shopify-section-tw_text_banner_section_r44Yin"
      aria-label="The Meru - Our Purpose"
    >
      {/* 1. Background Image Layer:
          - Sized and positioned to preserve native 16:9 ratio on desktop so the artisan's entire head,
            saffron saree, hands, and flower vessels are 100% visible with zero vertical cropping.
          - object-[right_top] / object-[88%_10%] anchors the focal point to her head and gajra.
      */}
      <div className="absolute right-0 top-0 bottom-0 h-full w-full md:w-[65%] lg:w-[60%] xl:w-[56%] pointer-events-none overflow-hidden flex justify-end">
        <img
          src="/assets/products/the-meru/meru_purpose_banner.jpg"
          alt="The Meru sacred flower upcycling craftsmanship - Indian woman artisan"
          className="h-full w-full object-cover object-[85%_10%] md:object-[right_top] lg:object-[88%_8%] select-none"
        />
      </div>

      {/* 2. Desktop Left-to-Right Faded Whitish/Ivory Gradient Overlay
          Blends the solid #F8F4EB text canvas on the left into the stone courtyard,
          leaving the artisan and flower vessels completely crystal clear on the right.
      */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #F8F4EB 0%, #F8F4EB 35%, rgba(248, 244, 235, 0.97) 46%, rgba(248, 244, 235, 0.72) 58%, rgba(248, 244, 235, 0.22) 70%, rgba(248, 244, 235, 0) 80%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Mobile Top-to-Bottom Faded Whitish Gradient Overlay */}
      <div
        className="block md:hidden absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(248, 244, 235, 0.98) 0%, rgba(248, 244, 235, 0.94) 52%, rgba(248, 244, 235, 0.5) 75%, rgba(248, 244, 235, 0.1) 100%)",
        }}
        aria-hidden="true"
      />

      {/* 4. Text Content Container (Positioned on the left over the pristine faded backdrop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 w-full relative z-10 py-10 sm:py-16 md:py-20">
        <div className="max-w-xl lg:max-w-[540px] flex flex-col items-start text-left">
          {/* Eyebrow Label with Sacred Gold Accent */}
          <span className="inline-flex items-center gap-2 font-sans text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#C99A28] font-bold mb-2.5">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#C99A28]" aria-hidden="true" />
            Social & Ecological Impact
          </span>

          {/* Headline */}
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold text-[#1E1C19] tracking-tight leading-[1.18] mb-3 sm:mb-4">
            Our Purpose
          </h2>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#3E3830] leading-relaxed font-normal mb-6 sm:mb-7 max-w-lg">
            We collect millions of sacred flowers offered in the temples of India and employ 300+ women from marginalized communities to upcycle these flowers into the world's first certified, handcrafted incense products.
          </p>

          {/* 3D Gold Action Button */}
          <LinkButton
            href="/pages/our-story"
            variant="primary"
            size="md"
            withArrow
            className="max-w-full"
          >
            LEARN MORE ABOUT OUR STORY
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
