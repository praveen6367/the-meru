"use client";

import React from "react";

/**
 * Top Announcement Bar for THE MERU.
 * Minimal, premium, restrained styling with free shipping incentive.
 */
export default function Section2() {
  return (
    <div
      className="w-full bg-sacred-ivory border-b border-deep-charcoal/10 text-deep-charcoal py-2 px-4 text-center select-none relative z-30"
      id="the-meru-announcement"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[11px] sm:text-xs font-sans tracking-widest uppercase font-medium">
        <span className="text-meru-gold font-sans">✧</span>
        <span>
          Free Shipping on all orders over <strong className="font-semibold text-deep-charcoal">₹499/-</strong>
        </span>
        <span className="hidden sm:inline text-deep-charcoal/30">•</span>
        <span className="hidden sm:inline text-muted-foreground">
          Handcrafted Sacred Rituals
        </span>
        <span className="text-meru-gold font-sans">✧</span>
      </div>
    </div>
  );
}
