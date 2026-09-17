"use client";

import React, { useState } from "react";
import type { MediaTileStyles } from "../_styles";

export type MediaTileData = {
  href: string;
  alt: string;
  height: string;
  imgSrc: string;
  srcSet: string;
  width: string;
  description: string;
  tag?: string;
  isFeatured?: boolean;
  categoryType?: "mukhwas" | "dhoop-bati" | "mouth-freshener";
};

// --------------------------------------------------------------------------
// Mathematical Polar Coordinate Helpers for Crisp SVG Rangoli Rendering
// --------------------------------------------------------------------------

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: Number((cx + r * Math.cos(rad)).toFixed(2)),
    y: Number((cy + r * Math.sin(rad)).toFixed(2)),
  };
}

// --------------------------------------------------------------------------
// Compact Reference Rangoli Surround SVG (Refined Proportions)
// Layers:
// 1. 24 Outermost Rounded Scallop Petals (r: 84 to 97)
// 2. Scalloped Rim with 24 Radially Aligned Oval Beads (r: 79.5)
// 3. Dense Ring of 32 Inverted U-loops / Arches (r: 68 to 73.5)
// 4. 16 Radiant Outward-Facing Teardrops / Flames with Dual Contours (r: 57 to 67)
// 5. 32 Engraved Radial Bezel Teeth Encircling the Medallion (r: 52.5 to 55.5)
// 6. Central Solid White Medallion sits snugly inside at r: 52 (diameter 104 in 200 box)
// --------------------------------------------------------------------------

const CX = 100;
const CY = 100;

// 1. 24 Outermost rounded flower petals
const NUM_PETALS = 24;
const PETAL_STEP = 360 / NUM_PETALS;
let outerPetalsPath = "";
for (let i = 0; i < NUM_PETALS; i++) {
  const a1 = i * PETAL_STEP;
  const a2 = (i + 1) * PETAL_STEP;
  const amid = a1 + PETAL_STEP / 2;
  const p1 = polarToCartesian(CX, CY, 84, a1);
  const pPeak = polarToCartesian(CX, CY, 97, amid);
  const p2 = polarToCartesian(CX, CY, 84, a2);
  if (i === 0) outerPetalsPath += `M ${p1.x} ${p1.y} `;
  outerPetalsPath += `Q ${pPeak.x} ${pPeak.y} ${p2.x} ${p2.y} `;
}
outerPetalsPath += "Z";

// 2. 24 Oval beads and inner scallop line
const OVAL_BEADS: { cx: number; cy: number; angle: number }[] = [];
for (let i = 0; i < NUM_PETALS; i++) {
  const amid = i * PETAL_STEP + PETAL_STEP / 2;
  const pos = polarToCartesian(CX, CY, 79.5, amid);
  OVAL_BEADS.push({ cx: pos.x, cy: pos.y, angle: amid });
}

let beadsInnerScallop = "";
for (let i = 0; i < NUM_PETALS; i++) {
  const a1 = i * PETAL_STEP;
  const a2 = (i + 1) * PETAL_STEP;
  const amid = a1 + PETAL_STEP / 2;
  const p1 = polarToCartesian(CX, CY, 74.5, a1);
  const pDip = polarToCartesian(CX, CY, 76.5, amid);
  const p2 = polarToCartesian(CX, CY, 74.5, a2);
  if (i === 0) beadsInnerScallop += `M ${p1.x} ${p1.y} `;
  beadsInnerScallop += `Q ${pDip.x} ${pDip.y} ${p2.x} ${p2.y} `;
}
beadsInnerScallop += "Z";

// 3. 32 Inverted U-loops / arches
const NUM_ARCHES = 32;
const ARCH_STEP = 360 / NUM_ARCHES;
let archesPath = "";
for (let i = 0; i < NUM_ARCHES; i++) {
  const a1 = i * ARCH_STEP;
  const a2 = (i + 1) * ARCH_STEP;
  const amid = a1 + ARCH_STEP / 2;
  const p1 = polarToCartesian(CX, CY, 68, a1);
  const pPeak = polarToCartesian(CX, CY, 73.5, amid);
  const p2 = polarToCartesian(CX, CY, 68, a2);
  if (i === 0) archesPath += `M ${p1.x} ${p1.y} `;
  archesPath += `Q ${pPeak.x} ${pPeak.y} ${p2.x} ${p2.y} `;
}
archesPath += "Z";

// 4. 16 Radiant outward teardrops/flames
const NUM_TEARDROPS = 16;
const TEARDROP_STEP = 360 / NUM_TEARDROPS;
const TEARDROPS: { outer: string; inner: string }[] = [];
for (let i = 0; i < NUM_TEARDROPS; i++) {
  const angle = i * TEARDROP_STEP;
  // Outer teardrop
  const tip = polarToCartesian(CX, CY, 67, angle);
  const left = polarToCartesian(CX, CY, 60.5, angle - 4.5);
  const right = polarToCartesian(CX, CY, 60.5, angle + 4.5);
  const base = polarToCartesian(CX, CY, 57, angle);

  // Inner teardrop
  const innerTip = polarToCartesian(CX, CY, 64.5, angle);
  const innerLeft = polarToCartesian(CX, CY, 60.5, angle - 2.5);
  const innerRight = polarToCartesian(CX, CY, 60.5, angle + 2.5);
  const innerBase = polarToCartesian(CX, CY, 58, angle);

  TEARDROPS.push({
    outer: `M ${tip.x} ${tip.y} C ${right.x} ${right.y}, ${base.x} ${base.y}, ${base.x} ${base.y} C ${base.x} ${base.y}, ${left.x} ${left.y}, ${tip.x} ${tip.y} Z`,
    inner: `M ${innerTip.x} ${innerTip.y} C ${innerRight.x} ${innerRight.y}, ${innerBase.x} ${innerBase.y}, ${innerBase.x} ${innerBase.y} C ${innerBase.x} ${innerBase.y}, ${innerLeft.x} ${innerLeft.y}, ${innerTip.x} ${innerTip.y} Z`,
  });
}

// 5. 32 Bezel teeth along inner rim
const NUM_TEETH = 32;
const TOOTH_STEP = 360 / NUM_TEETH;
const TEETH: { x1: number; y1: number; x2: number; y2: number }[] = [];
for (let i = 0; i < NUM_TEETH; i++) {
  const angle = i * TOOTH_STEP;
  const p1 = polarToCartesian(CX, CY, 52.5, angle);
  const p2 = polarToCartesian(CX, CY, 55.5, angle);
  TEETH.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
}

function RangoliReferenceSurround({
  isHovered,
  isFeatured,
  index = 0,
}: {
  isHovered: boolean;
  isFeatured: boolean;
  index?: number;
}) {
  const goldColor = isHovered ? "#C99A28" : isFeatured ? "#A67A28" : "#8A6420";
  const animClass =
    index === 1 ? "animate-rangoli-spin-reverse" : "animate-rangoli-spin";

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${animClass}`}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`rangoliGlowGrad-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="65%" stopColor="#C99A28" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8A6420" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Radiant ambient aura */}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill={`url(#rangoliGlowGrad-${index})`}
          className="transition-opacity duration-500"
          opacity={isHovered ? 0.9 : isFeatured ? 0.35 : 0.08}
        />

        {/* ====================================================================
            1. Outermost 24 Rounded Scallop Petals (From Reference Image)
           ==================================================================== */}
        <path
          d={outerPetalsPath}
          fill="none"
          stroke={goldColor}
          strokeWidth={isHovered ? 1.4 : 1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={isHovered ? 1 : isFeatured ? 0.9 : 0.72}
          className="transition-all duration-300"
        />

        {/* Scallop baseline circle under the petals */}
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke={goldColor}
          strokeWidth="0.85"
          opacity={isHovered ? 0.85 : 0.55}
          className="transition-all duration-300"
        />

        {/* ====================================================================
            2. Scalloped Band with 24 Oval Beads (From Reference Image)
           ==================================================================== */}
        {OVAL_BEADS.map((bead, idx) => (
          <ellipse
            key={`bead-${idx}`}
            cx={bead.cx}
            cy={bead.cy}
            rx="1.6"
            ry="3.1"
            transform={`rotate(${bead.angle} ${bead.cx} ${bead.cy})`}
            fill={isHovered ? "#C99A28" : goldColor}
            stroke={goldColor}
            strokeWidth="0.5"
            opacity={isHovered ? 1 : isFeatured ? 0.92 : 0.75}
            className="transition-all duration-300"
          />
        ))}

        {/* Inner scalloped contour of bead ring */}
        <path
          d={beadsInnerScallop}
          fill="none"
          stroke={goldColor}
          strokeWidth="0.85"
          opacity={isHovered ? 0.85 : 0.52}
          className="transition-all duration-300"
        />

        {/* Concentric baseline for arch loops */}
        <circle
          cx="100"
          cy="100"
          r="68"
          fill="none"
          stroke={goldColor}
          strokeWidth="0.75"
          opacity={isHovered ? 0.8 : 0.5}
          className="transition-all duration-300"
        />

        {/* ====================================================================
            3. 32 Inverted U-loops / Arches (From Reference Image)
           ==================================================================== */}
        <path
          d={archesPath}
          fill="none"
          stroke={goldColor}
          strokeWidth={isHovered ? 1.2 : 1}
          strokeLinecap="round"
          opacity={isHovered ? 0.95 : isFeatured ? 0.82 : 0.68}
          className="transition-all duration-300"
        />

        {/* Concentric boundary between arches and teardrop ring */}
        <circle
          cx="100"
          cy="100"
          r="68"
          fill="none"
          stroke={goldColor}
          strokeWidth="0.75"
          strokeDasharray="1.5 2.5"
          opacity={isHovered ? 0.75 : 0.45}
          className="transition-all duration-300"
        />

        {/* ====================================================================
            4. 16 Radiant Outward Teardrops / Flames (From Reference Image)
           ==================================================================== */}
        {TEARDROPS.map((td, idx) => (
          <g key={`td-${idx}`}>
            {/* Outer teardrop */}
            <path
              d={td.outer}
              fill={isHovered ? "rgba(201, 154, 40, 0.15)" : "none"}
              stroke={goldColor}
              strokeWidth={isHovered ? 1.2 : 1}
              strokeLinejoin="round"
              opacity={isHovered ? 1 : isFeatured ? 0.88 : 0.72}
              className="transition-all duration-300"
            />
            {/* Inner teardrop detail */}
            <path
              d={td.inner}
              fill={isHovered ? "#C99A28" : "none"}
              stroke={goldColor}
              strokeWidth="0.7"
              opacity={isHovered ? 0.95 : isFeatured ? 0.78 : 0.58}
              className="transition-all duration-300"
            />
          </g>
        ))}

        {/* Concentric base circle for teardrops */}
        <circle
          cx="100"
          cy="100"
          r="56"
          fill="none"
          stroke={goldColor}
          strokeWidth="0.85"
          opacity={isHovered ? 0.9 : 0.55}
          className="transition-all duration-300"
        />

        {/* ====================================================================
            5. 32 Bezel Teeth Encircling Medallion (From Reference Image)
           ==================================================================== */}
        {TEETH.map((tooth, idx) => (
          <line
            key={`tooth-${idx}`}
            x1={tooth.x1}
            y1={tooth.y1}
            x2={tooth.x2}
            y2={tooth.y2}
            stroke={goldColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={isHovered ? 0.95 : isFeatured ? 0.82 : 0.68}
            className="transition-all duration-300"
          />
        ))}

        {/* Outer rim guide for the central medallion */}
        <circle
          cx="100"
          cy="100"
          r="52"
          fill="none"
          stroke={goldColor}
          strokeWidth="0.9"
          opacity={isHovered ? 0.95 : 0.65}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
}

// --------------------------------------------------------------------------
// Vibrant Colorful Custom Product Category Icons (Bigger & High-Contrast)
// 1. Mukhwas (Royal brass katori, green cardamom pod, golden saunf, ruby candies)
// 2. Dhoop Bati (Brass burner, terracotta cone, glowing fiery ember, sacred smoke)
// 3. Mouth Freshener (Lush emerald Paan leaf, cool mint sprig, crystal dew drops)
// --------------------------------------------------------------------------

function ColorfulMukhwasIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={`w-[40px] h-[40px] md:w-[54px] md:h-[54px] shrink-0 ${className}`}
      aria-label="Colorful Mukhwas Icon"
    >
      <defs>
        {/* Polished Royal Brass Katori Gradient */}
        <linearGradient id="brassKatoriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2BF" />
          <stop offset="35%" stopColor="#F5BD38" />
          <stop offset="70%" stopColor="#C8931F" />
          <stop offset="100%" stopColor="#8A5E10" />
        </linearGradient>

        {/* Fresh Green Cardamom (Elaichi) Gradient */}
        <linearGradient id="elaichiGreenGrad" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#8AD68E" />
          <stop offset="50%" stopColor="#43A047" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>

        {/* Golden-Green Saunf Gradient */}
        <linearGradient id="saunfGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6EE9C" />
          <stop offset="60%" stopColor="#AFB42B" />
          <stop offset="100%" stopColor="#687010" />
        </linearGradient>

        {/* Soft Drop Shadow for Bowl */}
        <filter id="katoriShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#6D4C41" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Pedestal Foot of Royal Brass Bowl */}
      <path
        d="M17 33.5L15 37C15 37.8 17 38.5 22 38.5C27 38.5 29 37.8 29 37L27 33.5Z"
        fill="url(#brassKatoriGrad)"
        stroke="#6D4C41"
        strokeWidth="1.1"
      />

      {/* Royal Brass Katori Bowl Body */}
      <path
        d="M8 25C8 31.5 13.5 34 22 34C30.5 34 36 31.5 36 25Z"
        fill="url(#brassKatoriGrad)"
        stroke="#6D4C41"
        strokeWidth="1.2"
        filter="url(#katoriShadow)"
      />

      {/* Flared Interior Rim of Bowl */}
      <ellipse
        cx="22"
        cy="25"
        rx="14"
        ry="3.6"
        fill="#FFF9C4"
        stroke="#8A5E10"
        strokeWidth="1.2"
      />

      {/* Heap Base of Aromatic Digestive Seeds */}
      <ellipse cx="22" cy="24" rx="11.8" ry="3.2" fill="#D4AC0D" opacity="0.9" />

      {/* Colorful Sweet Fennel / Meethi Saunf Sugar Candies */}
      <circle cx="14.5" cy="23.5" r="1.8" fill="#E91E63" stroke="#C2185B" strokeWidth="0.5" />
      <circle cx="18.5" cy="22" r="1.7" fill="#FF9800" stroke="#E65100" strokeWidth="0.5" />
      <circle cx="25.5" cy="23" r="1.8" fill="#00E676" stroke="#00B248" strokeWidth="0.5" />
      <circle cx="28.8" cy="22.5" r="1.6" fill="#E040FB" stroke="#AA00FF" strokeWidth="0.5" />
      <circle cx="22" cy="24.5" r="1.5" fill="#FFFFFF" stroke="#D7CCC8" strokeWidth="0.5" />

      {/* Distinct Curved Golden-Green Saunf (Fennel Seeds) */}
      <path
        d="M12 21C13.8 19 16.5 19.5 17.5 21"
        stroke="url(#saunfGreenGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M26 20C27.8 18.2 30 18.8 31 20.5"
        stroke="url(#saunfGreenGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Whole Herbal Green Cardamom Pod (Chhoti Elaichi) Standing Proudly */}
      <path
        d="M19.2 10.5C16.5 14 17 18.5 20.8 20.5C24.5 21.5 27 18.8 26 14.5C25 10 21.2 9.5 19.2 10.5Z"
        fill="url(#elaichiGreenGrad)"
        stroke="#1B5E20"
        strokeWidth="1.2"
      />
      {/* Elaichi Rib Accent */}
      <path
        d="M20.8 11.2C20.5 14.5 21.8 17.5 23.8 19.5"
        stroke="#C8E6C9"
        strokeWidth="1.15"
        strokeLinecap="round"
      />

      {/* Fragrant Clove (Laung) Accent */}
      <path d="M12.5 13.8L15 16" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="11.8" cy="13" r="1.6" fill="#3E2723" />

      {/* Golden Aromatic Essence Sparkle */}
      <path
        d="M32 8.5V13.5M29.5 11H34.5"
        stroke="#FFB300"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <circle cx="32" cy="11" r="1.2" fill="#FFFDE7" />
    </svg>
  );
}

function ColorfulDhoopBatiIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={`w-[40px] h-[40px] md:w-[54px] md:h-[54px] shrink-0 ${className}`}
      aria-label="Colorful Dhoop Bati Icon"
    >
      <defs>
        {/* Polished Brass Burner Plate */}
        <linearGradient id="dhoopPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2BF" />
          <stop offset="40%" stopColor="#F5BD38" />
          <stop offset="80%" stopColor="#C8931F" />
          <stop offset="100%" stopColor="#8A5E10" />
        </linearGradient>

        {/* Sandalwood / Terracotta Cone Body */}
        <linearGradient id="coneTerracottaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4E342E" />
          <stop offset="40%" stopColor="#6D4C41" />
          <stop offset="70%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>

        {/* Glowing Smoldering Incense Ember */}
        <radialGradient id="emberGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFEB3B" />
          <stop offset="65%" stopColor="#FF5722" />
          <stop offset="100%" stopColor="#B71C1C" />
        </radialGradient>

        {/* Mystical Ascending Spiral Smoke */}
        <linearGradient id="smokeSpiralGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF9800" stopOpacity="0.88" />
          <stop offset="25%" stopColor="#42A5F5" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#7E57C2" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#CE93D8" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Polished Brass Ritual Plate Base */}
      <ellipse
        cx="22"
        cy="35.5"
        rx="14.5"
        ry="4.2"
        fill="url(#dhoopPlateGrad)"
        stroke="#6D4C41"
        strokeWidth="1.2"
      />
      <ellipse cx="22" cy="34.5" rx="11.5" ry="3" fill="#4E342E" opacity="0.35" />

      {/* Companion Cylindrical Dhoop Stick in Brass Collar */}
      <rect
        x="11"
        y="26.5"
        width="3.2"
        height="8.5"
        rx="1.2"
        fill="#3E2723"
        stroke="#212121"
        strokeWidth="0.8"
      />
      <rect
        x="10.5"
        y="31.5"
        width="4.2"
        height="2.2"
        rx="0.6"
        fill="url(#dhoopPlateGrad)"
      />

      {/* Traditional Conical Dhoop Bati */}
      <path
        d="M16 35L20.6 22C21.3 20.3 22.7 20.3 23.4 22L28 35C28 35 25 36.4 22 36.4C19 36.4 16 35 16 35Z"
        fill="url(#coneTerracottaGrad)"
        stroke="#271810"
        strokeWidth="1.15"
      />
      {/* Warm Incense Grooves */}
      <path
        d="M18.5 30.5C20.2 31.3 23.8 31.3 25.5 30.5"
        stroke="#2E1C14"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Glowing Fiery Smoldering Tip (Ember) */}
      <circle cx="22" cy="20.8" r="3.4" fill="url(#emberGlowGrad)" />
      <circle cx="22" cy="20.8" r="1.3" fill="#FFFFFF" />

      {/* Primary Ascending Scented Spiral Smoke (Left) */}
      <path
        d="M22 18.5C19.5 15 24 12.5 21 8.5C19 5.8 21 3.5 22 1.5"
        stroke="url(#smokeSpiralGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Secondary Wispy Smoke (Right) */}
      <path
        d="M24 17.5C26.5 14.5 25 11 27 8C28 6.2 27.5 4.5 26.5 3"
        stroke="url(#smokeSpiralGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

function ColorfulMouthFreshenerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={`w-[40px] h-[40px] md:w-[54px] md:h-[54px] shrink-0 ${className}`}
      aria-label="Colorful Mouth Freshener Icon"
    >
      <defs>
        {/* Lush Emerald Paan (Betel Leaf) Gradient */}
        <linearGradient id="paanEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="35%" stopColor="#43A047" />
          <stop offset="75%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>

        {/* Refreshing Mint Leaf Teal-Green Gradient */}
        <linearGradient id="mintTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#80CBC4" />
          <stop offset="50%" stopColor="#00897B" />
          <stop offset="100%" stopColor="#004D40" />
        </linearGradient>

        {/* Sparkling Crystalline Dew Drop */}
        <radialGradient id="dewDropGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#E1F5FE" />
          <stop offset="40%" stopColor="#4FC3F7" />
          <stop offset="85%" stopColor="#0288D1" />
          <stop offset="100%" stopColor="#01579B" />
        </radialGradient>

        {/* Royal Gulkand / Saffron Rose Accent */}
        <linearGradient id="gulkandRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4081" />
          <stop offset="100%" stopColor="#C2185B" />
        </linearGradient>
      </defs>

      {/* Fresh Mint Leaf Sprig in Background */}
      <path
        d="M22 13C22 7 27.5 5 31.2 5.5C32.2 9.2 29 12 22 13Z"
        fill="url(#mintTealGrad)"
        stroke="#004D40"
        strokeWidth="1.1"
      />
      <path
        d="M24.2 9.8C27 8.8 29 7.8 30.2 7.2"
        stroke="#E0F2F1"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Royal Paan (Betel Leaf) Main Heart Form */}
      <path
        d="M22 38.5C22 32.5 9.5 27 9.5 17C9.5 10.5 15 7 22 10.5C29 7 34.5 10.5 34.5 17C34.5 27 22 32.5 22 38.5Z"
        fill="url(#paanEmeraldGrad)"
        stroke="#1B5E20"
        strokeWidth="1.3"
      />

      {/* Golden-Lime Central Vein */}
      <path
        d="M22 11.5V36"
        stroke="#C8E6C9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Lateral Veins */}
      <path
        d="M22 17.5C18 16 13.8 17.8 12.8 19.5"
        stroke="#C8E6C9"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M22 17.5C26 16 30.2 17.8 31.2 19.5"
        stroke="#C8E6C9"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M22 23.5C19 23 15.8 24.5 14.8 26"
        stroke="#C8E6C9"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M22 23.5C25 23 28.2 24.5 29.2 26"
        stroke="#C8E6C9"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Royal Gulkand Rose / Saffron Core Accent */}
      <path
        d="M22 21C20.5 19.5 18.5 20.5 18.5 22C18.5 24 22 26.5 22 26.5C22 26.5 25.5 24 25.5 22C25.5 20.5 23.5 19.5 22 21Z"
        fill="url(#gulkandRoseGrad)"
        stroke="#880E4F"
        strokeWidth="0.7"
      />

      {/* Crystalline Freshness Dew Drops */}
      <circle
        cx="8.8"
        cy="12.5"
        r="2.4"
        fill="url(#dewDropGrad)"
        stroke="#B3E5FC"
        strokeWidth="0.6"
      />
      <circle cx="8" cy="11.8" r="0.8" fill="#FFFFFF" />

      <circle
        cx="34.5"
        cy="11"
        r="2.6"
        fill="url(#dewDropGrad)"
        stroke="#B3E5FC"
        strokeWidth="0.6"
      />
      <circle cx="33.6" cy="10.2" r="0.9" fill="#FFFFFF" />

      {/* Cooling Botanical Mist Sparkle */}
      <circle cx="15" cy="7.5" r="1.4" fill="#80D8FF" opacity="0.9" />
    </svg>
  );
}

// --------------------------------------------------------------------------
// Main MediaTile: The Meru Luxury Collection Navigator
// - Compact Rangoli surround with minimal loop rotation (55s)
// - Noticeably bigger colorful icons (Mukhwas, Dhoop Bati, Mouth Freshener)
// - SOLID PURE WHITE circle background (#FFFFFF) with crisp gold border
// - STRICTLY ONE LINE typography (whitespace-nowrap)
// --------------------------------------------------------------------------

export default function MediaTile({
  d,
  index = 0,
  styles,
}: {
  d: MediaTileData;
  index?: number;
  styles?: MediaTileStyles;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isFeatured = d.isFeatured || index === 1;

  // Render the vibrant colorful category icon
  const renderCategoryIcon = () => {
    const desc = (d.description || "").toLowerCase();
    const type = d.categoryType;

    if (type === "dhoop-bati" || desc.includes("dhoop") || index === 1) {
      return (
        <ColorfulDhoopBatiIcon className="transition-transform duration-300 group-hover:scale-110" />
      );
    }
    if (
      type === "mouth-freshener" ||
      desc.includes("mouth") ||
      desc.includes("fresh") ||
      index === 2
    ) {
      return (
        <ColorfulMouthFreshenerIcon className="transition-transform duration-300 group-hover:scale-110" />
      );
    }
    // Default to Mukhwas
    return (
      <ColorfulMukhwasIcon className="transition-transform duration-300 group-hover:scale-110" />
    );
  };

  return (
    <li className="list-item min-w-0 shrink-0">
      <a
        href={d.href}
        className="flex flex-col items-center justify-center group cursor-pointer px-1 xs:px-1.5 sm:px-3 py-1 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-meru-gold/60 rounded-[8px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`${d.description} - ${d.tag || "Collection"}`}
      >
        {/* ====================================================================
            COMPACT RANGOLI MANDALA (LOOP ANIMATION) + SOLID WHITE MEDALLION
            - On Mobile: Compact outer rangoli (104px) with BIGGER prominent white medallion (66px)
            - On Desktop: Full luxury footprint (152px) with 82px medallion
            - Icons are fully visible and 100% uncropped!
           ==================================================================== */}
        <div className="relative w-[104px] h-[104px] sm:w-[124px] sm:h-[124px] md:w-[152px] md:h-[152px] aspect-square shrink-0 flex items-center justify-center select-none">
          {/* Authentic Rangoli Artwork with Ambient Loop Rotation */}
          <RangoliReferenceSurround
            isHovered={isHovered}
            isFeatured={isFeatured}
            index={index}
          />

          {/* Central SOLID PURE WHITE Medallion Circle (Bigger relative to rangoli on mobile) */}
          <div
            className={`relative w-[66px] h-[66px] sm:w-[72px] sm:h-[72px] md:w-[82px] md:h-[82px] aspect-square shrink-0 rounded-full transition-all duration-300 ease-out flex items-center justify-center z-10 ${
              isHovered
                ? "scale-[1.05] shadow-[0_6px_22px_rgba(201,154,40,0.35),0_2px_5px_rgba(0,0,0,0.08)] border-meru-gold"
                : isFeatured
                ? "shadow-[0_4px_16px_rgba(201,154,40,0.22),0_1.5px_3px_rgba(0,0,0,0.06)] border-[#C99A28]/85"
                : "shadow-[0_3px_12px_rgba(138,100,32,0.14),0_1px_2px_rgba(0,0,0,0.04)] border-[#8A6420]/50"
            } border-[1.5px]`}
            style={{
              backgroundColor: "#ffffff",
              background: "#ffffff",
            }}
          >
            {/* Fine Inner Hairline Ring inside the Solid White Circle */}
            <div
              className={`absolute inset-[2.5px] sm:inset-[3px] rounded-full pointer-events-none transition-opacity duration-300 border border-dashed ${
                isHovered
                  ? "border-[#C99A28]/75 opacity-90"
                  : isFeatured
                  ? "border-[#C99A28]/55 opacity-75"
                  : "border-[#8A6420]/35 opacity-55"
              }`}
            />

            {/* Fully Visible Colorful Category Icon Centered on Solid White */}
            <div className="z-10 flex items-center justify-center">
              {renderCategoryIcon()}
            </div>
          </div>
        </div>

        {/* ====================================================================
            TYPOGRAPHY & MICRO-LABELS (STRICTLY ONE SINGLE LINE)
           ==================================================================== */}
        <div className="mt-1.5 text-center flex flex-col items-center">
          {/* Micro-Label */}
          {d.tag && (
            <span
              className={`text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] font-sans font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] transition-colors duration-200 mb-0.5 sm:mb-1 whitespace-nowrap block ${
                isFeatured
                  ? "text-meru-gold"
                  : "text-meru-gold/85 group-hover:text-meru-gold"
              }`}
            >
              {d.tag}
            </span>
          )}

          {/* Collection Title: STRICTLY ONE LINE (whitespace-nowrap) */}
          <h3 className="font-sans text-[12px] sm:text-[13.5px] md:text-[15.5px] font-medium text-deep-charcoal group-hover:text-meru-gold transition-colors duration-200 tracking-normal whitespace-nowrap text-center">
            {d.description}
          </h3>
        </div>
      </a>
    </li>
  );
}
