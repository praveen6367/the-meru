"use client";

import { useState } from "react";

const pressQuotes = [
  {
    logo: "/assets/cloned/images/18cbf8e67dbe.jpg",
    alt: "Forbes",
    publication: "Forbes",
    quote:
      "Reigniting India’s $3.2 billion home fragrance category, Phool has turned the jaded incense category into an experiential lifestyle one.",
  },
  {
    logo: "/assets/cloned/images/18cbf8e67dbe.jpg",
    alt: "BBC News",
    publication: "BBC News",
    quote:
      "A visionary initiative transforming tonnes of temple flower waste into certified organic incense while providing dignified livelihoods to women.",
  },
  {
    logo: "/assets/cloned/images/18cbf8e67dbe.jpg",
    alt: "The Hindu",
    publication: "The Hindu",
    quote:
      "Phool's pioneering flowercycling technology shows how circular economy principles can rejuvenate traditional spiritual practices without harming our rivers.",
  },
  {
    logo: "/assets/cloned/images/18cbf8e67dbe.jpg",
    alt: "YourStory",
    publication: "YourStory",
    quote:
      "From Kanpur's sacred ghats to global recognition, Phool is proving that sustainable, impact-first entrepreneurship can change the world.",
  },
];

/** Press quotes section: As seen in. */
export default function AsSeenInSection2() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeQuote = pressQuotes[activeIdx];

  return (
    <section className="w-full py-16 bg-background border-b border-black/5" id="shopify-section-as_seen_in_tw_hTdRYp">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground tracking-wider uppercase mb-8">
          As seen in
        </h2>

        <div className="flex flex-col items-center justify-center p-6 bg-surface-3/60 rounded-2xl shadow-xs min-h-[220px]">
          <img
            className="w-32 h-16 object-contain mb-4 filter grayscale hover:grayscale-0 transition-all"
            alt={activeQuote.alt}
            src={activeQuote.logo}
          />
          <blockquote className="text-base sm:text-lg text-foreground/90 font-medium italic max-w-2xl leading-relaxed mb-4">
            "{activeQuote.quote}"
          </blockquote>
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            {activeQuote.publication}
          </span>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {pressQuotes.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeIdx === i ? "w-6 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to press quote ${i + 1}`}
              suppressHydrationWarning
            />
          ))}
        </div>
      </div>
    </section>
  );
}
