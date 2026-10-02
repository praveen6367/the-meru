"use client";

import React from "react";

/**
 * Top Announcement Marquee Bar for THE MERU.
 * Continuous smooth scrolling ticker with quiet luxury styling,
 * highlighting free shipping above ₹299, ₹100 shipping under ₹299,
 * and pure sacred craftsmanship.
 */
const MARQUEE_ITEMS = [
  { text: "Free Shipping on Orders Above ₹299", highlight: true },
  { text: "Flat ₹100 Shipping on Orders ₹299 & Below", highlight: false },
  { text: "100% Charcoal-Free & Bamboo-Less", highlight: false },
  { text: "Handcrafted with Sacred Temple Flowers", highlight: false },
  { text: "Pan-India Dispatch in 24–48 Hours", highlight: false },
  { text: "Cash on Delivery & Secure Online Payments", highlight: false },
];

export default function Section2() {
  return (
    <div
      className="w-full bg-[#F8F5EE] border-b border-deep-charcoal/10 text-deep-charcoal py-2 overflow-hidden select-none relative z-30 font-sans"
      id="the-meru-announcement"
    >
      <div className="flex w-full overflow-hidden" title="The Meru Store Offers">
        <div className="animate-meru-marquee flex items-center shrink-0">
          {/* First loop set */}
          <div className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 text-[11px] sm:text-xs tracking-wider uppercase font-medium">
            {MARQUEE_ITEMS.map((item, idx) => (
              <span
                key={`m1-${idx}`}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  item.highlight
                    ? "font-semibold text-deep-charcoal"
                    : "text-[#554F46]"
                }`}
              >
                <span className="text-meru-gold text-xs">✦</span>
                {item.highlight ? (
                  <span>
                    Free Shipping on Orders Above{" "}
                    <span className="text-deep-charcoal font-bold underline decoration-meru-gold/60 decoration-2">
                      ₹299
                    </span>
                  </span>
                ) : (
                  <span>{item.text}</span>
                )}
              </span>
            ))}
          </div>

          {/* Second duplicate set for infinite seamless loop */}
          <div
            className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 text-[11px] sm:text-xs tracking-wider uppercase font-medium"
            aria-hidden="true"
          >
            {MARQUEE_ITEMS.map((item, idx) => (
              <span
                key={`m2-${idx}`}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  item.highlight
                    ? "font-semibold text-deep-charcoal"
                    : "text-[#554F46]"
                }`}
              >
                <span className="text-meru-gold text-xs">✦</span>
                {item.highlight ? (
                  <span>
                    Free Shipping on Orders Above{" "}
                    <span className="text-deep-charcoal font-bold underline decoration-meru-gold/60 decoration-2">
                      ₹299
                    </span>
                  </span>
                ) : (
                  <span>{item.text}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
