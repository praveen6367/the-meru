"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface CustomerReview {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  product: string;
  verified: boolean;
}

const REVIEWS: CustomerReview[] = [
  {
    id: "review-1",
    name: "Geetha Varadan",
    location: "Bengaluru",
    rating: 5,
    text: "The incense cones are very good, the fragrance is very soothing and pleasant and not too strong. The cones are also easy to light. In fact all the incense varieties are so good that it's difficult to choose from them. Would highly recommend to everyone.",
    product: "Organic Temple Incense Cones",
    verified: true,
  },
  {
    id: "review-2",
    name: "Ananya Sharma",
    location: "New Delhi",
    rating: 5,
    text: "The aroma creates a peaceful and positive atmosphere at home. Knowing that it repurposes sacred temple offerings and supports rural women artisans makes every morning prayer even more special.",
    product: "Handcrafted Sacred Incense Sticks",
    verified: true,
  },
  {
    id: "review-3",
    name: "Vikramaditya Roy",
    location: "Mumbai",
    rating: 5,
    text: "The Swarna festive gift box was the star of our festive gifting this year! The packaging is royal and exquisite, and the fragrance is divine. Truly a world-class Indian brand.",
    product: "Swarna Festive Gift Box",
    verified: true,
  },
  {
    id: "review-4",
    name: "Pooja Hegde",
    location: "Hyderabad",
    rating: 5,
    text: "Long lasting, charcoal-free, and leaves no toxic residue. Finally, incense sticks that don't trigger my allergies! Amazing product.",
    product: "Charcoal-Free Bambooless Incense",
    verified: true,
  },
];

export default function GeethaVaradanSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Visible count depending on viewport: 1 on mobile, 2 on tablet, 3 on desktop
  const total = REVIEWS.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer Reviews"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-5 bg-meru-gold/50" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-meru-gold">
              The Meru Community
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-deep-charcoal tracking-tight">
            Loved for the ritual. Remembered for the experience.
          </h2>
        </div>

        {/* Minimal Editorial Controls: ←  01 / 04  → */}
        <div className="flex items-center gap-4 self-start md:self-end">
          <button
            type="button"
            onClick={handlePrev}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-deep-charcoal/15 text-deep-charcoal/70 hover:text-deep-charcoal hover:border-meru-gold hover:bg-[#FFFFFF] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-meru-gold"
            aria-label="Previous review"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className="text-xs font-sans font-medium text-deep-charcoal/60 tracking-[0.2em] min-w-[50px] text-center select-none"
            aria-live="polite"
          >
            <span className="text-deep-charcoal font-semibold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-deep-charcoal/30">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-deep-charcoal/15 text-deep-charcoal/70 hover:text-deep-charcoal hover:border-meru-gold hover:bg-[#FFFFFF] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-meru-gold"
            aria-label="Next review"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Premium Cards Carousel Track */}
      <div className="overflow-hidden -mx-2 px-2 py-2">
        {/* CSS-driven responsive multi-card presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[0, 1, 2].map((offset) => {
            const reviewIndex = (currentIndex + offset) % total;
            const review = REVIEWS[reviewIndex];
            // Hide 3rd on tablet, 2nd & 3rd on mobile
            const hideClass =
              offset === 2 ? "hidden lg:flex" : offset === 1 ? "hidden md:flex" : "flex";

            return (
              <div
                key={`${review.id}-${offset}`}
                className={`${hideClass} flex-col justify-between bg-[#FFFFFF] border border-deep-charcoal/10 rounded-2xl p-5 sm:p-7 shadow-[0_4px_20px_-4px_rgba(30,28,25,0.04)] hover:shadow-[0_10px_26px_-4px_rgba(30,28,25,0.08)] hover:border-meru-gold/40 transition-all duration-300 min-h-[280px] sm:min-h-[320px]`}
              >
                <div>
                  {/* Top: Star Rating + Verified Buyer Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[...Array(review.rating)].map((_, starIdx) => (
                        <svg
                          key={starIdx}
                          className="w-3.5 h-3.5 text-meru-gold fill-current"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium uppercase tracking-wider text-emerald-800 bg-emerald-700/8 px-2 py-0.5 rounded-full border border-emerald-700/15">
                        <svg
                          className="w-2.5 h-2.5 text-emerald-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Customer Review Quote */}
                  <blockquote className="text-[14px] sm:text-[15px] font-sans font-normal text-deep-charcoal/90 leading-relaxed">
                    “{review.text}”
                  </blockquote>
                </div>

                {/* Bottom: Customer Attribution & Product Context */}
                <div className="mt-5 pt-4 border-t border-deep-charcoal/6 flex flex-col gap-0.5">
                  <span className="text-sm font-sans font-semibold text-deep-charcoal tracking-wide">
                    — {review.name}
                  </span>
                  <span className="text-[11px] font-sans text-muted-foreground/80">
                    Reviewed: {review.product}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide dots for visual position */}
      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-7">
        {REVIEWS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? "w-7 bg-meru-gold"
                : "w-2 bg-deep-charcoal/20 hover:bg-deep-charcoal/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
