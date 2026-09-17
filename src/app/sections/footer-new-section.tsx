"use client";

import React, { useState } from "react";

/**
 * Centralized Footer Configuration
 * All contact information and policy entries are organized here for easy future updates.
 * Note: Contact details and legal routes are clearly marked temporary development placeholders.
 */
export const footerConfig = {
  brandStatement: "Rooted in tradition. Reimagined with purpose.",
  contact: {
    email: "hello@themeru.example",
    phone: "+91 XXXXX XXXXX",
  },
  navLinks: [
    { label: "Home", targetId: "the-meru-hero-banner" },
    { label: "Shop", targetId: "shopify-section-165769448781d7dc80" },
    { label: "Our Story", targetId: "shopify-section-tw_text_banner_section_r44Yin" },
    { label: "Our Process", targetId: "shopify-section-1528548198130" },
    { label: "Reviews", targetId: "shopify-section-1658756054ba8c44da" },
  ],
  policies: [
    {
      title: "Privacy Policy",
      summary:
        "This is a development placeholder for The Meru Privacy Policy. Official privacy and data protection documentation will be provided here prior to production launch.",
    },
    {
      title: "Terms & Conditions",
      summary:
        "This is a development placeholder for The Meru Terms & Conditions. Final terms of service and commercial guidelines will be provided here prior to production launch.",
    },
    {
      title: "Shipping & Delivery",
      summary:
        "This is a development placeholder for Shipping & Delivery guidelines. Full fulfillment, packaging, and delivery timelines will be finalized here prior to launch.",
    },
    {
      title: "Returns & Refunds",
      summary:
        "This is a development placeholder for The Meru Return & Refund Policy. Detailed exchange, return, and cancellation procedures will be outlined here.",
    },
  ],
  copyrightYear: 2026,
};

export default function FooterNewSection() {
  const [activePolicy, setActivePolicy] = useState<{ title: string; summary: string } | null>(
    null
  );

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="w-full bg-[#1E1C19] text-[#F8F5EE] py-12 sm:py-16 md:py-20 border-t border-[#F8F5EE]/10"
      id="the-meru-footer"
      role="contentinfo"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* 1. Official THE MERU Logo Asset */}
        <a
          href="#the-meru-hero-banner"
          onClick={(e) => handleScrollTo(e, "the-meru-hero-banner")}
          className="inline-block hover:opacity-90 transition-opacity mb-4"
          title="THE MERU"
        >
          <img
            src="/assets/cloned/Logo_gold_transparent.png"
            alt="THE MERU"
            className="h-8 sm:h-9 w-auto object-contain mx-auto"
          />
        </a>

        {/* 2. Short Brand Statement */}
        <p className="font-sans text-sm sm:text-base text-[#F8F5EE]/75 max-w-md mx-auto leading-relaxed mb-6 font-normal">
          “{footerConfig.brandStatement}”
        </p>

        {/* 3. Subtle Meru Gold Ornamental Detail */}
        <div className="flex items-center justify-center gap-2 mb-7 sm:mb-8 select-none" aria-hidden="true">
          <span className="h-[1px] w-6 bg-[#C99A28]/40" />
          <span className="text-[#C99A28] text-xs font-sans">✧</span>
          <span className="h-[1px] w-6 bg-[#C99A28]/40" />
        </div>

        {/* 4. One-Page Anchor Navigation */}
        <nav aria-label="One-page navigation" className="mb-7">
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-[13px] font-sans uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium text-[#F8F5EE]/80 [list-style-type:none]">
            {footerConfig.navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={`#${item.targetId}`}
                  onClick={(e) => handleScrollTo(e, item.targetId)}
                  className="hover:text-[#C99A28] transition-colors py-1 inline-block"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 5. Contact Placeholders (Clearly editable development data) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-sans text-[#F8F5EE]/60 mb-10">
          <a
            href={`mailto:${footerConfig.contact.email}`}
            className="hover:text-[#C99A28] transition-colors"
          >
            {footerConfig.contact.email}
          </a>
          <span className="hidden sm:inline text-[#F8F5EE]/20">•</span>
          <a
            href={`tel:${footerConfig.contact.phone.replace(/\s+/g, "")}`}
            className="hover:text-[#C99A28] transition-colors"
          >
            {footerConfig.contact.phone}
          </a>
        </div>

        {/* 6. Subtle Horizontal Divider */}
        <div className="w-full h-[1px] bg-[#F8F5EE]/12 mb-8" aria-hidden="true" />

        {/* 7. Essential Legal & Policy Placeholders */}
        <nav aria-label="Policy links" className="mb-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-sans text-[#F8F5EE]/55 [list-style-type:none]">
            {footerConfig.policies.map((policy) => (
              <li key={policy.title}>
                <button
                  type="button"
                  onClick={() => setActivePolicy(policy)}
                  className="hover:text-[#F8F5EE]/90 hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  {policy.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 8. Copyright */}
        <p className="text-[11px] sm:text-xs font-sans text-[#F8F5EE]/45 tracking-wide">
          © {footerConfig.copyrightYear} THE MERU. All rights reserved.
        </p>
      </div>

      {/* Policy Drawer / Modal (Development Placeholder) */}
      {activePolicy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
        >
          <div className="bg-[#FAF8F5] text-[#1E1C19] border border-[#1E1C19]/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActivePolicy(null)}
              className="absolute top-4 right-4 p-2 text-[#1E1C19]/60 hover:text-[#1E1C19] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C99A28] mb-2 block">
              Development Placeholder
            </span>
            <h3 id="policy-modal-title" className="text-xl font-sans font-semibold mb-4 text-[#1E1C19]">
              {activePolicy.title}
            </h3>
            <p className="text-sm font-sans text-[#46382B] leading-relaxed mb-6 font-normal">
              {activePolicy.summary}
            </p>
            <div className="pt-4 border-t border-[#1E1C19]/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                className="px-5 py-2 text-xs font-sans font-semibold uppercase tracking-wider bg-[#1E1C19] text-[#F8F5EE] rounded-lg hover:bg-[#1E1C19]/90 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
