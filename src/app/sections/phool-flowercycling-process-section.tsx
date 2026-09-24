"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface StepItem {
  step: number;
  image: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    step: 1,
    image: "/step1.png",
    description:
      "Temple flower waste is collected from temples in 6 cities and brought to our facilities.",
  },
  {
    step: 2,
    image: "/step2.png",
    description:
      "Flowers are manually segregated and unwanted materials are removed.",
  },
  {
    step: 3,
    image: "/step3.png",
    description:
      "The flower petals are cleaned and sun-dried naturally.",
  },
  {
    step: 4,
    image: "/step4.png",
    description:
      "Dried petals are powdered and blended with natural plant extracts and herbal ingredients to make a dough.",
  },
  {
    step: 5,
    image: "/step5.png",
    description:
      "The dough is hand-rolled by women flowercyclers into incense sticks and cones.",
  },
  {
    step: 6,
    image: "/step6.png",
    description:
      "The dried incense sticks and cones are dipped into 100% pure essential oils.",
  },
  {
    step: 7,
    image: "/step7.png",
    description:
      "The aromatic sticks and cones are carefully packed into The Meru boxes.",
  },
  {
    step: 8,
    image: "/step8.png",
    description:
      "Each pack gives new life to 125 kgs of temple flowers, keeping them out of the Ganges and landfills.",
  },
];

export default function PhoolFlowercyclingProcessSection() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set([1]));

  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate center line fill progress based on scroll position
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start filling when top enters viewport, finish when bottom leaves
    const totalDist = rect.height - windowHeight * 0.4;
    const currentDist = -rect.top + windowHeight * 0.4;

    let progress = (currentDist / totalDist) * 100;
    progress = Math.max(0, Math.min(100, progress));
    setScrollProgress(progress);

    // Track visible steps
    const newVisible = new Set<number>();
    stepRefs.current.forEach((el, index) => {
      if (!el) return;
      const stepRect = el.getBoundingClientRect();
      if (stepRect.top < windowHeight * 0.75) {
        newVisible.add(index + 1);
      }
    });

    if (newVisible.size > 0) {
      setVisibleSteps(newVisible);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-24 bg-white border-b border-[#E9DDC9]/50 overflow-hidden"
      id="shopify-section-1528548198130"
      aria-label="The Meru Flowercycling Process"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Human-Crafted Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold text-[#1E1C19] tracking-wider uppercase">
            The Meru Flowercycling® Process
          </h2>
          <div className="w-14 h-[2px] bg-[#BA8136] mx-auto mt-3 rounded-full" aria-hidden="true" />
        </div>

        {/* Roadmap Timeline Container */}
        <div className="relative">
          {/* ======================================================== */}
          {/* DESKTOP CENTER TIMELINE LINE */}
          {/* ======================================================== */}
          <div
            className="hidden lg:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-[2px] bg-[#E9DDC9]"
            aria-hidden="true"
          >
            {/* Golden Active Scroll Progress Line */}
            <div
              className="absolute top-0 left-0 right-0 bg-[#BA8136] transition-all duration-150 ease-out"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* ======================================================== */}
          {/* MOBILE TIMELINE LINE (Left side) */}
          {/* ======================================================== */}
          <div
            className="lg:hidden absolute left-5 sm:left-6 top-6 bottom-6 w-[2px] bg-[#E9DDC9]"
            aria-hidden="true"
          >
            <div
              className="absolute top-0 left-0 right-0 bg-[#BA8136] transition-all duration-150 ease-out"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* ======================================================== */}
          {/* 8 ROADMAP STEPS (Alternating: 1 on Left, 2 on Right) */}
          {/* ======================================================== */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {STEPS.map((item, index) => {
              const isEven = item.step % 2 === 0; // Step 2, 4, 6, 8 -> Right
              const isOdd = !isEven;              // Step 1, 3, 5, 7 -> Left
              const isPassed = visibleSteps.has(item.step);

              return (
                <div
                  key={item.step}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="relative"
                >
                  {/* ================================================== */}
                  {/* DESKTOP LAYOUT (lg and up) */}
                  {/* ================================================== */}
                  <div className="hidden lg:grid grid-cols-2 gap-16 xl:gap-20 items-center relative">
                    {/* CENTER CIRCLE WITH STEP NUMBER */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center font-sans font-semibold text-sm transition-all duration-500 border-2 ${
                          isPassed
                            ? "bg-[#BA8136] text-white border-[#BA8136] shadow-sm scale-110"
                            : "bg-[#FAF8F5] text-[#46382B] border-[#BA8136]/50"
                        }`}
                      >
                        {item.step}
                      </div>

                      {/* Subtle connecting horizontal branch to the step */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 h-[1.5px] bg-[#BA8136]/40 pointer-events-none transition-all duration-500 ${
                          isOdd
                            ? "right-full w-8 bg-gradient-to-l from-[#BA8136]/60 to-transparent"
                            : "left-full w-8 bg-gradient-to-r from-[#BA8136]/60 to-transparent"
                        }`}
                      />
                    </div>

                    {/* LEFT COLUMN */}
                    <div className={isOdd ? "pr-8 xl:pr-12" : ""}>
                      {isOdd && (
                        /* STEP ON LEFT (1, 3, 5, 7) */
                        <div
                          className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
                            isPassed
                              ? "opacity-100 translate-y-0"
                              : "opacity-40 translate-y-6"
                          }`}
                        >
                          <div className="w-full max-w-md relative aspect-[3/2] mx-auto">
                            <Image
                              src={item.image}
                              alt={`Step ${item.step}`}
                              fill
                              sizes="(max-width: 1200px) 450px, 500px"
                              className="object-contain"
                              priority={item.step <= 2}
                            />
                          </div>
                          <p className="mt-4 text-[#46382B] font-sans text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className={isEven ? "pl-8 xl:pl-12" : ""}>
                      {isEven && (
                        /* STEP ON RIGHT (2, 4, 6, 8) */
                        <div
                          className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
                            isPassed
                              ? "opacity-100 translate-y-0"
                              : "opacity-40 translate-y-6"
                          }`}
                        >
                          <div className="w-full max-w-md relative aspect-[3/2] mx-auto">
                            <Image
                              src={item.image}
                              alt={`Step ${item.step}`}
                              fill
                              sizes="(max-width: 1200px) 450px, 500px"
                              className="object-contain"
                              priority={item.step <= 2}
                            />
                          </div>
                          <p className="mt-4 text-[#46382B] font-sans text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ================================================== */}
                  {/* MOBILE & TABLET LAYOUT (< lg) */}
                  {/* ================================================== */}
                  <div className="lg:hidden pl-12 sm:pl-16 relative">
                    {/* Circle Step Number on the left timeline */}
                    <div className="absolute left-5 sm:left-6 top-4 -translate-x-1/2 z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-xs transition-all duration-300 border-2 ${
                          isPassed
                            ? "bg-[#BA8136] text-white border-[#BA8136]"
                            : "bg-[#FAF8F5] text-[#46382B] border-[#BA8136]/50"
                        }`}
                      >
                        {item.step}
                      </div>
                    </div>

                    {/* Step Content: Image directly followed by description */}
                    <div
                      className={`flex flex-col items-start transition-all duration-500 ${
                        isPassed
                          ? "opacity-100 translate-y-0"
                          : "opacity-50 translate-y-4"
                      }`}
                    >
                      <div className="w-full max-w-sm relative aspect-[3/2]">
                        <Image
                          src={item.image}
                          alt={`Step ${item.step}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-contain"
                        />
                      </div>
                      <p className="mt-3 text-[#46382B] font-sans text-xs sm:text-sm leading-relaxed max-w-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
