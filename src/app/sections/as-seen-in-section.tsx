"use client";

import React, { useState } from "react";

// ============================================================================
// 1. FOUR AUTHENTIC, PROPORTIONATE BRAND VALUE ICONS
//    - Charcoal Free: Large, prominent faceted charcoal briquette lumps matching
//      the reference image, with rich carbon graphite facets & fresh botanical leaf.
//    - 100% Organic: Large, prominent twin-leaf botanical branch gracefully filling
//      the medallion without an extra constraining circle.
//    - Recyclable Materials: Official universal 3D Möbius recycling loop (ISO/Gary Anderson standard).
//    - Cruelty Free: Official high-fidelity rabbit silhouette with radiant ruby heart.
// ============================================================================

/**
 * 01. Charcoal Free
 * Prominent, large-scale faceted charcoal rocks matching the reference image,
 * with rich carbon graphite facets, metallic gold ridge glints, and fresh botanical leaf.
 */
function CharcoalFreeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 52"
      fill="none"
      className={className}
      aria-label="Charcoal Free Icon"
    >
      <defs>
        {/* Obsidian Charcoal Main Facet Gradient */}
        <linearGradient id="cfMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A505A" />
          <stop offset="35%" stopColor="#26282E" />
          <stop offset="100%" stopColor="#121316" />
        </linearGradient>

        {/* Charcoal Top Sunlit Facet Gradient */}
        <linearGradient id="cfTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B93A0" />
          <stop offset="45%" stopColor="#555C66" />
          <stop offset="100%" stopColor="#363A42" />
        </linearGradient>

        {/* Right Rock Facet Gradient */}
        <linearGradient id="cfRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3E434D" />
          <stop offset="60%" stopColor="#212328" />
          <stop offset="100%" stopColor="#111215" />
        </linearGradient>

        {/* Fresh Botanical Leaf Gradient */}
        <linearGradient id="cfLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5D6A7" />
          <stop offset="45%" stopColor="#43A047" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>

        {/* Second Leaf Lighter Gradient */}
        <linearGradient id="cfLeafLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8E6C9" />
          <stop offset="50%" stopColor="#66BB6A" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>

        {/* Chiseled Sacred Gold Ridge Glint */}
        <linearGradient id="cfGoldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5C2" />
          <stop offset="50%" stopColor="#F5BD38" />
          <stop offset="100%" stopColor="#B8861B" />
        </linearGradient>

        <filter id="cfDropShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#111215" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#cfDropShadow)">
        {/* === LEFT PRIMARY CHARCOAL ROCK (Large & Faceted) === */}
        {/* Top Sloping Facet */}
        <polygon
          points="6,27 18,14 30,19 22,29"
          fill="url(#cfTopGrad)"
          stroke="#0D0E10"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Front Left Main Facet */}
        <polygon
          points="6,27 22,29 20,42 8,41"
          fill="url(#cfMainGrad)"
          stroke="#0D0E10"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Front Right Deep Facet */}
        <polygon
          points="22,29 30,19 32,36 20,42"
          fill="#1A1B1F"
          stroke="#0D0E10"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* === RIGHT SECONDARY CHARCOAL ROCK (Nestled alongside) === */}
        {/* Top Sloping Facet */}
        <polygon
          points="30,24 39,18 47,23 39,29"
          fill="url(#cfTopGrad)"
          stroke="#0D0E10"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Front Facet */}
        <polygon
          points="30,24 39,29 38,41 28,35"
          fill="url(#cfRightGrad)"
          stroke="#0D0E10"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Right Lateral Facet */}
        <polygon
          points="39,29 47,23 46,37 38,41"
          fill="#121316"
          stroke="#0D0E10"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* Chiseled Gold Edge Accents on Ridge Lines */}
        <line x1="22" y1="29" x2="20" y2="42" stroke="url(#cfGoldEdge)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="6" y1="27" x2="22" y2="29" stroke="url(#cfGoldEdge)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="30" y1="24" x2="39" y2="29" stroke="url(#cfGoldEdge)" strokeWidth="1.4" strokeLinecap="round" />

        {/* Fresh Botanical Purity Leaf behind/beside the rock */}
        <path
          d="M34 38 C42 36 47 27 43 20 C38 21 32 29 33 37 Z"
          fill="url(#cfLeafGrad)"
          stroke="#143D1D"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M34 36 C38 29 40 24 41 22"
          stroke="#C8E6C9"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Companion Small Sprout Leaf */}
        <path
          d="M38 35 C44 34 47 30 46 25 C42 26 39 30 38 35 Z"
          fill="url(#cfLeafLightGrad)"
          stroke="#1B5E20"
          strokeWidth="1"
        />
      </g>

      {/* Purity Sparkle Star (top left) */}
      <path d="M17 9 V15 M14 12 H20" stroke="#F5BD38" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="12" r="1.3" fill="#FFFDE7" />
      <circle cx="23" cy="7" r="0.9" fill="#F5BD38" />
    </svg>
  );
}

/**
 * 02. 100% Organic
 * Large, prominent twin-leaf branch directly matching the reference image.
 * Fills the white medallion generously and elegantly with rich emerald greens and dewdrop.
 */
function OrganicIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 52"
      fill="none"
      className={className}
      aria-label="100% Organic Icon"
    >
      <defs>
        {/* Left Leaf Lush Emerald Gradient */}
        <linearGradient id="orgEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5D6A7" />
          <stop offset="40%" stopColor="#43A047" />
          <stop offset="85%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>

        {/* Right Leaf Sunlit Botanical Lime Gradient */}
        <linearGradient id="orgLimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DCEDC8" />
          <stop offset="45%" stopColor="#7CB342" />
          <stop offset="85%" stopColor="#558B2F" />
          <stop offset="100%" stopColor="#33691E" />
        </linearGradient>

        {/* Robust 2D Stem Gradient */}
        <linearGradient id="orgStemFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="50%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#143D1D" />
        </linearGradient>

        {/* Sparkling Dewdrop Gradient */}
        <radialGradient id="orgDewDrop" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#80D8FF" />
          <stop offset="100%" stopColor="#0091EA" />
        </radialGradient>

        <filter id="orgShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#1B5E20" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#orgShadow)">
        {/* 1. LEFT BOTANICAL LEAF */}
        <path
          d="M26 30 C17 30 6 23 7 10 C14 6 26 12 26 25 Z"
          fill="url(#orgEmeraldGrad)"
          stroke="#143D1D"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Left Leaf Central Vein */}
        <path
          d="M9 11.5 C16 15.5 22.5 22.5 26 30"
          stroke="#C8E6C9"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Left Leaf Delicate Side Veins */}
        <path d="M14 16 C17 19 21 20 23 21" stroke="#A5D6A7" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <path d="M17 12 C19 14 23 16 24 17" stroke="#A5D6A7" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />

        {/* 2. RIGHT BOTANICAL LEAF */}
        <path
          d="M26 29 C35 29 46 23 45 10 C38 6 26 12 26 25 Z"
          fill="url(#orgLimeGrad)"
          stroke="#2E7D32"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Right Leaf Central Vein */}
        <path
          d="M43 11.5 C36 15.5 29.5 22.5 26 29"
          stroke="#F1F8E9"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Right Leaf Delicate Side Veins */}
        <path d="M38 16 C35 19 31 20 29 21" stroke="#DCEDC8" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <path d="M35 12 C33 14 29 16 28 17" stroke="#DCEDC8" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />

        {/* 3. CENTRAL BOTANICAL STEM & ROOT (Crisp 2D contour on top of leaves) */}
        {/* Solid contoured stem tapering down to root */}
        <path
          d="M24.2 25 C24.2 31 24.0 38 23.5 44 C24.5 44.8 27.5 44.8 28.5 44 C28.0 38 27.8 31 27.8 25 Z"
          fill="url(#orgStemFill)"
          stroke="#143D1D"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Root Base / Root Flare at bottom of stem */}
        <path
          d="M22 44.5 C24 45.6 28 45.6 30 44.5 C30.5 45.8 29 46.8 26 46.8 C23 46.8 21.5 45.8 22 44.5 Z"
          fill="#143D1D"
          stroke="#143D1D"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Lateral Rootlet Whisker Left */}
        <path
          d="M23.5 44 C21 45.2 19 44.6 17.5 43.5"
          stroke="#2E7D32"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Lateral Rootlet Whisker Right */}
        <path
          d="M28.5 44 C31 45.2 33 44.6 34.5 43.5"
          stroke="#2E7D32"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Central Stem Luminous Vein Spine */}
        <path
          d="M26 22 V44"
          stroke="#C8E6C9"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* Crystalline Morning Dewdrops */}
        <circle cx="10" cy="12" r="2.2" fill="url(#orgDewDrop)" />
        <circle cx="9.3" cy="11.2" r="0.8" fill="#FFFFFF" />
        <circle cx="42" cy="12" r="1.8" fill="url(#orgDewDrop)" />
        <circle cx="41.4" cy="11.3" r="0.6" fill="#FFFFFF" />
      </g>

      {/* Sacred Golden Essence Sparkle at top */}
      <path d="M26 3 V8 M23.5 5.5 H28.5" stroke="#F5BD38" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="26" cy="5.5" r="1.2" fill="#FFFDE7" />
    </svg>
  );
}

/**
 * 03. Recyclable Materials
 * Official universal 3D Möbius recycling loop (ISO 7000 / Gary Anderson standard)
 * rendered in rich The Meru Gold, Emerald Green, and Copper with dark borders.
 */
function RecyclableMaterialsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 777 733"
      fill="none"
      className={className}
      aria-label="Recyclable Materials Icon"
    >
      <defs>
        {/* Ribbon 1 - Emerald Botanical Green */}
        <linearGradient id="recWikiGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="45%" stopColor="#388E3C" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>

        {/* Ribbon 2 - Rich Copper Terracotta */}
        <linearGradient id="recWikiCopper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFCC80" />
          <stop offset="45%" stopColor="#FB8C00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>

        {/* Ribbon 3 - The Meru Gold */}
        <linearGradient id="recWikiGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2BF" />
          <stop offset="40%" stopColor="#F5BD38" />
          <stop offset="80%" stopColor="#C8931F" />
          <stop offset="100%" stopColor="#8A5E10" />
        </linearGradient>

        <filter id="recWikiShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#1E1C19" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#recWikiShadow)">
        {/* --- Left Arrow: Fold & Main Body --- */}
        <path
          d="M280 272 C134 187 134 187 134 187 C210 54 210 54 210 54 C231 17 309 16 336 48 C373 110 373 110 373 110z"
          fill="#0D3512"
          stroke="#1E1C19"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M162 475 C84 475 84 475 84 475 C54 471.75 4 410 34 354 C68 297 68 297 68 297 C15 266 15 266 15 266 C183 266 183 266 183 266 C268 412 268 412 268 412 C215 383 215 383 215 383z"
          fill="url(#recWikiGreen)"
          stroke="#1E1C19"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --- Bottom Arrow: Fold & Main Body --- */}
        <path
          d="M363 496 C363 667 363 667 363 667 C176 667 176 667 176 667 C165 668 157 657 151 648 C63 492 64 493 60 488 C64.75 492 70 496 85 496z"
          fill="#752207"
          stroke="#1E1C19"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M687 496 C706 494 709 489 714 486 C620 652 620 652 620 652 C616 660 608 667 596 667 C492 667 492 667 492 667 C492 728 492 728 492 728 C407 583 407 583 407 583 C492 437 492 437 492 437 C492 496 492 496 492 496z"
          fill="url(#recWikiCopper)"
          stroke="#1E1C19"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --- Right/Top Arrow: Fold & Main Body --- */}
        <path
          d="M519 315 C666 231 666 231 666 231 C743 362 743 362 743 362 C771 416 723 468 691 474 C612 474 612 474 612 474z"
          fill="#6E4508"
          stroke="#1E1C19"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M357 35 C351 27 339 17 328 15 C525 15 525 15 525 15 C536 15 546 19 551 28 C602 118 602 118 602 118 C653 89 653 89 653 89 C570 233 570 233 570 233 C404 233 404 233 404 233 C454 203 454 203 454 203z"
          fill="url(#recWikiGold)"
          stroke="#1E1C19"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/**
 * 04. Cruelty Free
 * Authentic sitting Cruelty Free bunny facing left with long upright ears,
 * cute paws on the baseline, and radiant floating ruby heart from the reference image.
 */
function CrueltyFreeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-label="Cruelty Free Icon"
    >
      <defs>
        {/* Champagne Caramel Bunny Body */}
        <linearGradient id="bunnyBodyGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="40%" stopColor="#F8EED9" />
          <stop offset="100%" stopColor="#E8D4B7" />
        </linearGradient>

        {/* Radiant Ruby-Coral Heart */}
        <linearGradient id="heartRubyGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6E40" />
          <stop offset="40%" stopColor="#E91E63" />
          <stop offset="85%" stopColor="#C2185B" />
          <stop offset="100%" stopColor="#880E4F" />
        </linearGradient>

        {/* Bunny Dark Outline Stroke */}
        <linearGradient id="bunnyStrokeGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A2810" />
          <stop offset="100%" stopColor="#2B1506" />
        </linearGradient>

        <filter id="bunnyShadowNew" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#3E2723" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#bunnyShadowNew)">
        {/* Rabbit Body Fill (Smooth Champagne Cream) */}
        <path
          d="M 19.89 39.37 L 19.76 39.24 L 19.76 38.45 L 19.37 38.05 L 16.21 38.05 L 16.08 37.92 L 16.21 37.53 L 16.47 37.79 L 17.0 37.79 L 17.39 37.39 L 17.39 32.92 L 16.08 31.61 L 16.08 31.34 L 15.55 30.55 L 15.55 30.03 L 15.29 29.76 L 15.29 28.97 L 15.55 28.71 L 15.55 27.39 L 15.82 27.13 L 15.82 26.34 L 15.16 25.68 L 13.84 25.68 L 13.05 26.21 L 12.53 26.21 L 12.26 26.47 L 11.21 26.47 L 10.55 25.55 L 10.55 24.76 L 10.29 24.5 L 10.29 24.24 L 10.55 23.97 L 10.55 22.66 L 10.82 22.39 L 10.82 21.87 L 11.34 21.08 L 11.34 20.82 L 11.87 20.29 L 12.0 19.89 L 13.32 18.58 L 13.71 18.45 L 13.71 18.18 L 13.97 17.92 L 13.97 15.55 L 14.24 15.29 L 14.24 14.5 L 14.5 14.24 L 14.5 13.71 L 14.76 13.45 L 15.29 12.13 L 15.82 11.61 L 15.82 11.34 L 16.74 10.42 L 17.0 10.42 L 17.53 9.89 L 17.79 9.89 L 19.11 9.11 L 19.63 9.11 L 19.89 8.84 L 20.68 8.84 L 20.95 8.58 L 21.21 8.58 L 21.34 9.24 L 20.82 9.5 L 21.08 9.76 L 20.29 10.82 L 20.03 11.61 L 19.24 12.39 L 19.24 12.66 L 16.21 15.42 L 15.42 15.68 L 15.29 16.08 L 14.5 16.87 L 14.5 17.39 L 14.89 18.05 L 15.16 18.05 L 15.95 18.58 L 16.47 18.58 L 16.74 18.84 L 17.0 18.84 L 18.45 20.29 L 18.45 20.55 L 19.89 22.26 L 20.68 22.53 L 20.95 22.79 L 23.32 22.79 L 23.58 23.05 L 24.89 23.05 L 25.16 23.32 L 25.95 23.32 L 26.74 23.84 L 27.53 24.11 L 29.5 26.08 L 29.5 26.34 L 29.76 26.61 L 29.76 27.13 L 30.03 27.39 L 30.03 27.92 L 30.29 28.18 L 30.29 28.97 L 30.55 29.24 L 30.55 30.29 L 30.82 30.55 L 30.82 32.13 L 30.55 32.39 L 30.55 32.66 L 30.82 32.92 L 30.82 36.34 L 31.74 37.26 L 33.05 37.26 L 33.18 37.39 L 32.53 38.05 L 22.26 38.05 L 22.13 37.92 L 22.53 37.53 L 24.11 37.53 L 24.76 36.87 L 24.76 35.82 L 24.24 35.03 L 24.24 34.5 L 23.97 34.24 L 23.97 33.71 L 23.71 33.45 L 23.71 32.92 L 23.45 32.66 L 23.45 31.87 L 23.71 31.61 L 23.71 31.08 L 24.63 30.16 L 24.89 30.16 L 25.16 29.89 L 26.74 29.89 L 27.39 29.24 L 27.39 28.71 L 26.74 28.05 L 25.16 28.05 L 24.89 28.32 L 24.37 28.32 L 24.11 28.58 L 23.84 28.58 L 23.32 29.11 L 23.05 29.11 L 22.39 29.76 L 22.39 30.03 L 21.87 30.82 L 21.87 33.45 L 22.13 33.71 L 21.87 33.97 L 21.87 34.24 L 22.39 34.5 L 22.66 35.82 L 22.53 35.95 L 21.74 35.95 L 21.47 36.21 L 21.21 36.21 L 20.29 37.13 L 20.29 37.39 L 20.03 37.66 L 20.03 39.24 L 19.89 39.37 Z"
          fill="url(#bunnyBodyGradNew)"
        />

        {/* Rabbit Outline Stroke (Clean Espresso Contour) */}
        <path
          d="M 14.76 4.5 L 15.29 5.03 L 15.29 5.29 L 15.55 5.55 L 15.55 6.34 L 15.82 6.61 L 15.82 7.66 L 16.08 7.92 L 16.08 8.71 L 16.21 8.84 L 16.74 8.84 L 17.26 8.32 L 17.53 8.32 L 18.32 7.79 L 18.84 7.79 L 19.11 7.53 L 19.89 7.53 L 20.16 7.26 L 22.53 7.26 L 22.92 7.66 L 22.92 8.97 L 22.66 9.24 L 22.39 10.55 L 21.87 11.08 L 21.61 11.87 L 20.29 13.45 L 20.29 13.71 L 18.84 15.16 L 18.58 15.16 L 17.26 16.47 L 17.0 16.47 L 16.61 16.87 L 16.61 17.13 L 17.79 17.79 L 18.05 17.79 L 19.5 19.24 L 19.5 19.5 L 20.29 20.29 L 20.29 20.55 L 20.68 20.95 L 20.95 20.95 L 21.21 21.21 L 22.79 21.21 L 23.05 21.47 L 24.63 21.47 L 24.89 21.74 L 25.68 21.74 L 25.95 22.0 L 27.26 22.26 L 28.32 23.05 L 28.58 23.05 L 30.55 25.03 L 31.08 26.34 L 31.34 26.61 L 31.61 27.92 L 31.87 28.18 L 31.87 29.5 L 32.13 29.76 L 32.13 35.29 L 32.53 35.68 L 32.79 35.68 L 33.05 35.42 L 34.63 35.42 L 35.03 35.82 L 35.03 37.92 L 34.5 38.45 L 34.37 38.84 L 34.11 38.84 L 33.32 39.37 L 20.42 39.37 L 20.29 39.24 L 20.29 37.66 L 20.82 37.13 L 20.82 36.87 L 21.74 36.21 L 22.79 36.21 L 22.92 36.08 L 22.92 35.29 L 22.66 35.03 L 22.66 34.5 L 22.39 34.24 L 22.39 33.97 L 22.13 33.71 L 22.13 32.66 L 21.87 32.39 L 21.87 31.87 L 22.13 31.61 L 22.13 30.82 L 22.39 30.55 L 22.39 30.29 L 23.84 28.84 L 24.11 28.84 L 24.37 28.58 L 24.89 28.58 L 25.16 28.32 L 26.74 28.32 L 27.13 28.71 L 27.13 29.24 L 26.74 29.63 L 25.16 29.63 L 24.89 29.89 L 24.11 30.16 L 23.45 31.08 L 23.18 32.39 L 23.45 32.66 L 23.45 33.71 L 23.71 33.97 L 23.71 34.24 L 23.97 34.5 L 23.97 35.03 L 24.5 35.82 L 24.5 36.87 L 23.58 37.53 L 22.0 37.53 L 21.61 37.92 L 21.61 38.18 L 21.74 38.32 L 32.79 38.32 L 33.71 37.66 L 33.71 36.87 L 33.05 36.74 L 32.79 37.0 L 31.74 37.0 L 31.08 36.08 L 31.08 31.08 L 30.82 30.82 L 30.82 29.5 L 30.55 29.24 L 30.55 28.18 L 30.29 27.92 L 30.29 27.13 L 30.03 26.87 L 29.76 26.08 L 29.24 25.55 L 29.24 25.29 L 28.32 24.37 L 28.05 24.37 L 27.53 23.84 L 27.26 23.84 L 25.95 23.05 L 25.42 23.05 L 25.16 22.79 L 23.84 22.79 L 23.58 22.53 L 20.95 22.53 L 20.68 22.26 L 20.42 22.26 L 17.0 18.58 L 15.42 18.05 L 14.76 17.13 L 15.03 16.87 L 15.03 16.61 L 15.68 15.95 L 15.95 15.95 L 17.0 14.89 L 17.26 14.89 L 19.76 12.39 L 19.76 12.13 L 20.82 10.82 L 20.82 10.55 L 21.61 9.24 L 21.61 8.71 L 21.47 8.58 L 19.89 8.58 L 19.63 8.84 L 19.11 8.84 L 18.84 9.11 L 17.0 9.89 L 15.29 11.61 L 15.29 11.87 L 14.76 12.39 L 14.76 12.66 L 14.5 12.92 L 14.5 13.45 L 14.24 13.71 L 14.24 14.24 L 13.97 14.5 L 13.97 15.29 L 13.71 15.55 L 13.71 17.92 L 13.05 18.58 L 12.79 18.58 L 12.66 18.97 L 11.34 20.29 L 11.34 20.55 L 10.29 22.39 L 10.29 23.45 L 10.03 23.71 L 10.03 24.5 L 10.29 24.76 L 10.29 25.82 L 11.21 26.74 L 12.26 26.74 L 12.53 26.47 L 13.05 26.47 L 13.84 25.95 L 15.16 25.95 L 15.29 26.08 L 15.29 26.34 L 15.55 26.61 L 15.55 27.13 L 15.29 27.39 L 15.29 28.71 L 15.03 28.97 L 15.03 29.76 L 15.29 30.03 L 15.29 30.55 L 15.82 31.34 L 15.82 31.61 L 17.13 32.92 L 17.13 37.13 L 16.47 37.26 L 15.55 37.92 L 15.95 38.32 L 19.37 38.32 L 19.5 38.45 L 19.5 38.97 L 19.11 39.37 L 14.37 39.37 L 14.24 39.24 L 14.24 37.66 L 15.16 36.47 L 16.08 36.08 L 16.08 33.71 L 15.03 32.66 L 15.03 32.39 L 14.5 31.87 L 14.5 31.61 L 14.24 31.34 L 14.24 30.82 L 13.97 30.55 L 13.97 27.66 L 13.32 27.53 L 13.05 27.79 L 12.26 27.79 L 12.0 28.05 L 11.21 28.05 L 10.95 27.79 L 10.42 27.79 L 9.5 26.87 L 9.5 26.61 L 8.97 25.82 L 8.97 22.39 L 9.5 21.61 L 9.5 21.08 L 9.76 20.82 L 10.03 20.03 L 10.82 19.24 L 10.82 18.97 L 12.39 17.39 L 12.39 16.34 L 12.66 16.08 L 12.66 14.76 L 12.92 14.5 L 12.92 13.71 L 13.18 13.45 L 13.18 12.92 L 13.45 12.66 L 13.97 11.34 L 14.5 10.82 L 14.5 10.55 L 15.55 9.5 L 15.55 9.24 L 15.16 9.11 L 14.76 8.45 L 14.76 7.13 L 14.5 6.87 L 14.5 6.34 L 14.11 5.95 L 13.84 5.95 L 12.92 7.13 L 12.92 7.39 L 12.39 7.92 L 12.39 8.18 L 11.61 9.5 L 11.61 10.03 L 11.34 10.29 L 11.34 14.24 L 11.61 14.5 L 11.61 15.55 L 11.87 15.82 L 12.13 17.13 L 11.74 17.53 L 11.21 17.53 L 10.82 17.13 L 10.82 16.34 L 10.55 16.08 L 10.55 15.29 L 10.29 15.03 L 10.29 13.71 L 10.03 13.45 L 10.03 10.82 L 10.29 10.55 L 10.29 9.76 L 10.82 8.97 L 10.82 8.45 L 11.08 8.18 L 11.34 7.39 L 11.87 6.87 L 12.13 6.08 L 13.58 4.63 L 13.97 4.5 Z"
          fill="url(#bunnyStrokeGradNew)"
        />

        {/* Floating Radiant Ruby Heart */}
        <path
          d="M 29.63 21.21 L 28.84 21.21 L 28.32 20.68 L 28.05 20.68 L 25.29 17.92 L 25.29 17.66 L 23.97 16.08 L 23.97 15.55 L 23.45 14.76 L 23.45 12.66 L 23.71 12.39 L 23.71 12.13 L 25.16 10.68 L 25.68 10.68 L 25.95 10.42 L 27.53 10.42 L 28.84 11.21 L 29.37 11.21 L 30.68 10.42 L 32.26 10.42 L 32.53 10.68 L 33.05 10.68 L 34.5 12.13 L 34.5 12.39 L 34.76 12.66 L 34.76 14.76 L 34.5 15.03 L 33.71 16.87 L 32.92 17.66 L 32.92 17.92 L 30.16 20.68 L 29.76 20.82 L 29.63 21.21 Z"
          fill="#6A0C38"
        />
        <path
          d="M 29.5 19.5 L 31.87 17.13 L 31.87 16.87 L 33.18 15.29 L 33.18 15.03 L 33.45 14.76 L 33.45 12.92 L 32.26 11.74 L 30.95 11.74 L 30.68 12.0 L 30.42 12.0 L 29.37 13.05 L 28.84 13.05 L 27.79 12.0 L 27.53 12.0 L 27.26 11.74 L 25.95 11.74 L 24.76 12.92 L 24.76 13.45 L 24.5 13.71 L 24.5 13.97 L 24.76 14.24 L 24.76 14.76 L 25.03 15.03 L 25.03 15.29 L 25.55 15.82 L 25.55 16.08 L 26.34 16.87 L 26.34 17.13 L 28.84 19.63 L 29.5 19.5 Z"
          fill="url(#heartRubyGradNew)"
        />

        {/* Inner ear delicate rose accent */}
        <path
          d="M 14.5 12 C 14 8, 13.5 6, 14.5 5.5 C 15.5 5, 16.5 7.5, 17 11.5"
          stroke="#F8BBD0"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// ============================================================================
// 2. SECTION DATA
// ============================================================================

const BRAND_VALUES = [
  {
    id: "charcoal-free",
    title: "Charcoal Free",
    description:
      "Every product is made with purity in mind, ensuring a safe and charcoal-free experience.",
    icon: (isHovered: boolean) => (
      <CharcoalFreeIcon
        className={`w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
      />
    ),
  },
  {
    id: "organic",
    title: "100% Organic",
    description:
      "Every ingredient is carefully sourced naturally, ensuring purity, health,and wellness.",
    icon: (isHovered: boolean) => (
      <OrganicIcon
        className={`w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
      />
    ),
  },
  {
    id: "recyclable",
    title: "Recyclable Materials",
    description:
      "Designed with recyclable materials for peace of mind, safety, and everyday sustainability.",
    icon: (isHovered: boolean) => (
      <RecyclableMaterialsIcon
        className={`w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
      />
    ),
  },
  {
    id: "cruelty-free",
    title: "Cruelty Free",
    description:
      "Every product is created with compassion, completely free from animal testing or harm.",
    icon: (isHovered: boolean) => (
      <CrueltyFreeIcon
        className={`w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
      />
    ),
  },
];

// ============================================================================
// 3. MAIN COMPONENT
//    Strictly ONE SINGLE ROW on Desktop (md:grid-cols-4) with clean vertical dividers,
//    and balanced 2x2 grid on mobile screens.
// ============================================================================

export default function AsSeenInSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="w-full bg-[#F8F4EB] py-9 sm:py-11 lg:py-12 relative overflow-hidden border-y border-[#E9DDC9]/50"
      id="shopify-section-as_seen_in_2_tw_9Q4iQM"
      aria-label="The Meru Brand Values"
    >
      {/* Subtle atmospheric radial wash */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,154,40,0.035)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/*
            DESKTOP: STRICTLY ONE ROW (md:grid-cols-4)
            - All 4 items side-by-side horizontally
            - Clean vertical dividers (md:border-r on items 0, 1, 2)
            - ZERO horizontal row-split lines on desktop (md:border-b-0)

            MOBILE: 2x2 grid (grid-cols-2)
            - Items 0 & 1 have border-b
            - Items 0 & 2 have border-r
        */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {BRAND_VALUES.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.id}
                className={`group flex flex-col items-center text-center px-2 xs:px-3 sm:px-4 lg:px-6 py-4 xs:py-5 sm:py-6 md:py-3 transition-all duration-300 ${
                  // Desktop: vertical dividers between items, no border on last
                  index < 3
                    ? "md:border-r md:border-[#1E1C19]/[0.08]"
                    : "md:border-r-0"
                } ${
                  // Mobile: right border on left column
                  index % 2 === 0 ? "border-r border-[#1E1C19]/[0.08]" : "border-r-0"
                } ${
                  // Mobile: bottom border on top row, ZERO bottom border on desktop
                  index < 2
                    ? "border-b border-[#1E1C19]/[0.08] md:border-b-0"
                    : "border-b-0"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Circular Medallion Housing the Colored Icon */}
                <div
                  className={`relative w-[62px] h-[62px] xs:w-[70px] xs:h-[70px] sm:w-[78px] sm:h-[78px] rounded-full transition-all duration-300 ease-out flex items-center justify-center mb-2.5 sm:mb-3.5 border-[1.5px] ${
                    isHovered
                      ? "scale-[1.06] shadow-[0_6px_22px_rgba(201,154,40,0.28),0_2px_5px_rgba(0,0,0,0.05)] border-[#C99A28]"
                      : "shadow-[0_4px_16px_rgba(201,154,40,0.12),0_1.5px_3px_rgba(0,0,0,0.03)] border-[#C99A28]/55"
                  }`}
                  style={{
                    backgroundColor: "#ffffff",
                    background: "#ffffff",
                  }}
                >
                  {/* Subtle Inner Dashed Gold Rim */}
                  <div
                    className={`absolute inset-[3px] rounded-full pointer-events-none transition-opacity duration-300 border border-dashed ${
                      isHovered
                        ? "border-[#C99A28]/80 opacity-95"
                        : "border-[#8A6420]/35 opacity-60"
                    }`}
                  />

                  {/* Vibrant Colored Custom Icon */}
                  <div className="z-10 flex items-center justify-center">
                    {item.icon(isHovered)}
                  </div>
                </div>

                {/* Content: Title & Description */}
                <div className="flex flex-col items-center max-w-[240px]">
                  {/* Title */}
                  <h3 className="font-sans text-[14px] xs:text-[15.5px] sm:text-[17px] lg:text-[18px] font-semibold text-[#1E1C19] tracking-tight leading-snug mb-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-[11px] xs:text-[12px] sm:text-[13px] text-[#5D574E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
