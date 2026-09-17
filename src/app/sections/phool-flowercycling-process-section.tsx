"use client";

import React, { useState, useRef, useCallback } from "react";

interface ProcessStep {
  step: number;
  title: string;
  desc: string;
  relX: number;
  relY: number;
}

const STEPS_DATA: ProcessStep[] = [
  {
    step: 1,
    title: "Temple Flower Waste Collection",
    desc: "Temple flower waste is collected from temples in 6 cities and brought to our facilities.",
    relX: 13,
    relY: 22,
  },
  {
    step: 2,
    title: "Manual Segregation",
    desc: "Flowers are manually segregated and unwanted materials are removed.",
    relX: 47,
    relY: 22,
  },
  {
    step: 3,
    title: "Natural Sun-Drying",
    desc: "The flower petals are cleaned and sun-dried naturally.",
    relX: 79,
    relY: 22,
  },
  {
    step: 4,
    title: "Herbal Dough Blending",
    desc: "Dried petals are powdered and blended with natural plant extracts and herbal ingredients to make a dough.",
    relX: 55,
    relY: 50,
  },
  {
    step: 5,
    title: "Hand-Rolling Sticks & Cones",
    desc: "The dough is hand-rolled by women flowercyclers into incense sticks and cones.",
    relX: 13,
    relY: 74,
  },
  {
    step: 6,
    title: "Pure Essential Oil Dipping",
    desc: "The dried incense sticks and cones are dipped into 100% pure essential oils.",
    relX: 35,
    relY: 74,
  },
  {
    step: 7,
    title: "Artisanal Packing",
    desc: "The aromatic sticks and cones are carefully packed into The Meru boxes.",
    relX: 58,
    relY: 74,
  },
  {
    step: 8,
    title: "Sacred Upcycled Offerings",
    desc: "Each pack gives new life to 125 kgs of temple flowers, keeping them out of the Ganges and landfills.",
    relX: 83,
    relY: 74,
  },
];

/** The Meru Flowercycling Process section with artisanal mobile craftsmanship inspection loupe. */
export default function PhoolFlowercyclingProcessSection() {
  const [isLensActive, setIsLensActive] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, relX: 13, relY: 22 });
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const relX = (x / rect.width) * 100;
    const relY = (y / rect.height) * 100;

    setLensPos({
      x,
      y,
      relX,
      relY,
    });

    // Detect closest step based on coordinates
    let closestStep = 1;
    let minDist = Infinity;
    STEPS_DATA.forEach((s) => {
      const dist = Math.hypot(s.relX - relX, (s.relY - relY) * 1.5);
      if (dist < minDist) {
        minDist = dist;
        closestStep = s.step;
      }
    });
    setActiveStep(closestStep);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isLensActive) return;
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isLensActive) return;
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const currentStepData = STEPS_DATA.find((s) => s.step === activeStep) || STEPS_DATA[0];

  return (
    <section
      className="w-full py-12 sm:py-16 bg-white border-b border-[#E9DDC9]/50 select-none"
      id="shopify-section-1528548198130"
      aria-label="The Meru Flowercycling Process"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Header styled to The Meru Brand Design System */}
        <div className="mb-6 sm:mb-10 flex flex-col items-center">
          <h2 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold text-[#1E1C19] tracking-wider uppercase">
            The Meru Flowercycling® Process
          </h2>
          <div className="w-14 h-[2px] bg-[#BA8136] mt-3 rounded-full" aria-hidden="true" />
        </div>

        {/* Mobile Magnifying Lens Control Toggle */}
        <div className="md:hidden flex flex-col items-center mb-4">
          <button
            type="button"
            onClick={() => {
              const nextState = !isLensActive;
              setIsLensActive(nextState);
              if (nextState) {
                // Default to Step 1
                setActiveStep(1);
                setLensPos({ x: 0, y: 0, relX: 13, relY: 22 });
              }
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-semibold transition-all shadow-xs cursor-pointer ${
              isLensActive
                ? "bg-[#1E1C19] text-[#F8F5EE] border border-[#1E1C19]"
                : "meru-btn-copper-platinum text-[#1E160D] border-none"
            }`}
            aria-pressed={isLensActive}
          >
            <span className="text-[#C99A28] text-sm">✧</span>
            <span>{isLensActive ? "Close Craft Loupe ✕" : "Explore With Craft Loupe"}</span>
          </button>

          {isLensActive && (
            <p className="text-[11px] font-sans text-muted-foreground mt-2 animate-in fade-in duration-200">
              Drag the golden marker on the process map or tap steps 1–8 below
            </p>
          )}
        </div>

        {/* Infographic Illustration Container */}
        <div className="w-full flex flex-col items-center pb-2 sm:pb-0">
          <div
            ref={containerRef}
            className={`w-full max-w-5xl relative ${
              isLensActive ? "touch-none cursor-crosshair" : ""
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onClick={(e) => {
              if (isLensActive) {
                updatePosition(e.clientX, e.clientY);
              }
            }}
          >
            {/* Base Image */}
            <img
              className="w-full h-auto object-contain mx-auto block pointer-events-none"
              data-component="image"
              alt="The Meru Flowercycling Process Infographic"
              src="/assets/products/the-meru/process.png"
              draggable={false}
            />

            {/* Handcrafted Pointer / Dragger Target Marker on Top of the Image */}
            {isLensActive && (
              <div
                className="md:hidden absolute pointer-events-none transition-all duration-75 ease-out z-20"
                style={{
                  left: `${lensPos.relX}%`,
                  top: `${lensPos.relY}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Artisanal Golden Frame Reticle */}
                <div
                  className="w-13 h-10 border-2 rounded-[6px] bg-[#CCA04C]/25 shadow-md flex items-center justify-center relative"
                  style={{
                    borderColor: "#BA8136",
                    boxShadow: "0 4px 12px rgba(186,129,54,0.35)",
                  }}
                >
                  {/* Top Pointer Badge */}
                  <div
                    className="absolute -top-4.5 left-1/2 -translate-x-1/2 text-[8px] font-sans font-bold px-1.5 py-0.2 rounded uppercase tracking-wider whitespace-nowrap shadow-xs"
                    style={{
                      backgroundColor: "#1E1C19",
                      color: "#E9C672",
                      border: "1px solid #BA8136",
                    }}
                  >
                    Step {activeStep}
                  </div>
                  {/* Center reticle dot */}
                  <div className="w-2 h-2 rounded-full bg-[#BA8136] ring-2 ring-white/80" />
                </div>
              </div>
            )}
          </div>

          {/* DEDICATED MAGNIFIED LENS VIEWER (Positioned OUTSIDE & BELOW the image box) */}
          {isLensActive && (
            <div
              className="md:hidden w-full max-w-md mt-4 p-3.5 bg-[#FAF8F5] rounded-2xl flex flex-col items-center animate-in fade-in slide-in-from-top-2 duration-200"
              style={{
                border: "2px solid #BA8136",
                boxShadow: "0 6px 24px -2px rgba(186, 129, 54, 0.22), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* Header: Editorial & Handcrafted */}
              <div className="w-full flex items-center justify-between mb-2 px-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#1E1C19]">
                  <span className="text-[#BA8136]">✧</span>
                  <span className="tracking-wide">Handcrafted Flowercycling® Process</span>
                </span>
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#BA8136] font-bold">
                  Step {activeStep} of 8
                </span>
              </div>

              {/* Magnified Loupe Viewport Box */}
              <div
                className="w-full h-[185px] rounded-xl overflow-hidden bg-white relative shadow-inner"
                style={{
                  border: "2px solid #BA8136",
                }}
              >
                <div
                  className="w-full h-full transition-all duration-75 ease-out"
                  style={{
                    backgroundImage: "url('/assets/products/the-meru/process.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "320% auto",
                    backgroundPosition: `${lensPos.relX}% ${lensPos.relY}%`,
                  }}
                />

                {/* Subtle Aim Reticle in Center of Viewport */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
                  <div className="w-4 h-4 rounded-full border border-[#BA8136]" />
                </div>
              </div>

              {/* Jump to Step: 1 to 8 Buttons */}
              <div className="w-full mt-3 pt-2.5 border-t border-[#BA8136]/30 flex flex-col items-center">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-deep-charcoal mb-2">
                  Jump to Step (1–8):
                </span>
                <div className="flex items-center justify-center gap-1.5 xs:gap-2 flex-wrap">
                  {STEPS_DATA.map((item) => {
                    const isSelected = activeStep === item.step;
                    return (
                      <button
                        key={item.step}
                        type="button"
                        onClick={() => {
                          setActiveStep(item.step);
                          setLensPos({ x: 0, y: 0, relX: item.relX, relY: item.relY });
                        }}
                        className={`w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "meru-btn-copper-platinum text-[#1E160D] scale-110 shadow-xs ring-2 ring-[#BA8136]/50"
                            : "bg-white text-deep-charcoal border border-[#BA8136]/45 hover:border-[#BA8136] hover:bg-sacred-ivory"
                        }`}
                        aria-label={`Jump to Step ${item.step}: ${item.title}`}
                      >
                        {item.step}
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Details Badge (Human-crafted editorial summary) */}
                {currentStepData && (
                  <div className="mt-3 text-center px-3 py-2 rounded-lg bg-sacred-ivory/90 border border-[#BA8136]/35 w-full">
                    <div className="text-[11.5px] font-sans font-bold text-deep-charcoal uppercase tracking-wider">
                      Step {currentStepData.step} • {currentStepData.title}
                    </div>
                    <p className="text-[11px] font-sans text-[#46382B] leading-snug mt-1">
                      “{currentStepData.desc}”
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
