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
      className="relative w-full overflow-hidden bg-[#F8F4EB] border-b border-[#E9DDC9]/50 min-h-[460px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px] xl:min-h-[640px] flex flex-col md:flex-row md:items-center"
      id="shopify-section-tw_text_banner_section_r44Yin"
      aria-label="The Meru - Our Purpose"
    >
      {/* 1. Desktop Background Image Layer (md+):
          Anchored to the right side where the artisan woman and sacred flower vessels are featured.
          Balanced height provides natural framing for the artisan, temple architecture, and flowers.
      */}
      <div className="hidden md:flex absolute right-0 top-0 bottom-0 h-full w-[64%] lg:w-[60%] xl:w-[58%] pointer-events-none overflow-hidden justify-end">
        <img
          src="/assets/products/the-meru/meru_purpose_banner.jpg"
          alt="The Meru sacred flower upcycling craftsmanship - Indian woman artisan"
          className="h-full w-full object-cover object-[right_center] lg:object-[82%_center] xl:object-[80%_center] select-none"
        />
      </div>

      {/* 2. Desktop Left-to-Right Faded Whitish/Ivory Gradient Overlay:
          Blends the solid #F8F4EB text canvas on the left seamlessly into the courtyard,
          leaving the artisan woman and flower vessels completely crystal clear on the right.
      */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #F8F4EB 0%, #F8F4EB 32%, rgba(248, 244, 235, 0.97) 44%, rgba(248, 244, 235, 0.7) 56%, rgba(248, 244, 235, 0.2) 68%, rgba(248, 244, 235, 0) 80%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Text Content Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 w-full relative z-10 py-8 sm:py-10 md:py-14 lg:py-18 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-[500px] flex flex-col items-start text-left">
          {/* Eyebrow Label with Sacred Gold Accent */}
          <span className="inline-flex items-center gap-2 font-sans text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#C99A28] font-bold mb-2.5">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#C99A28]" aria-hidden="true" />
            Social & Ecological Impact
          </span>

          {/* Headline */}
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold text-[#1E1C19] tracking-tight leading-[1.18] mb-3.5 sm:mb-4">
            Our Purpose
          </h2>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#3E3830] leading-relaxed font-normal mb-6 sm:mb-7 max-w-lg">
            We collect millions of sacred flowers offered in the temples of India and employ 300+ women from marginalized communities to upcycle these flowers into the world&apos;s first certified, handcrafted incense products.
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

      {/* 4. Mobile Dedicated Image Showcase (<md):
          Prominently displays the artisan woman, North Indian traditional attire,
          and temple flower vessels with vibrant clarity and zero opaque washing-out.
      */}
      <div className="block md:hidden w-full px-5 pb-8 pt-1">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-[#E9DDC9]/80 aspect-[16/10] bg-[#EFE9DC]">
          <img
            src="/assets/products/the-meru/meru_purpose_banner.jpg"
            alt="The Meru sacred flower upcycling craftsmanship - Indian woman artisan"
            className="w-full h-full object-cover object-[78%_center] select-none"
          />
        </div>
      </div>
    </section>
  );
}
