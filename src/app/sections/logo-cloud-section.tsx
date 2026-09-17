"use client";

import { useRef, useState } from "react";
import MediaTile2, { type MediaTile2Data } from "../components/media-tile2";
import { MediaTile2_styles } from "../_styles";

const defaultProducts: MediaTile2Data[] = [
  {
    ariaLabel: "1 / 3",
    href: "/products/mukhwas-treats-pack-of-6",
    alt: "Mukhwas & Treats (Pack of 6)",
    imgSrc: "/assets/products/the-meru/mukhwas-treats-pack-of-6.webp",
    alt2: "Mukhwas & Treats (Pack of 6)",
    imgSrc2: "/assets/products/the-meru/mukhwas-treats-pack-of-6.webp",
    label: "Mukhwas & Treats (Pack of 6)",
    label2: "Pack of 6 • Artisanal Blends",
    id: "AddProductForm-the-meru-mukhwas-treats",
    id2: "BtnAddProduct-the-meru-mukhwas-treats",
    label3: "₹2,400",
    label4: "₹1,200",
    label5: "50% OFF",
  },
  {
    ariaLabel: "2 / 3",
    href: "/products/the-meru-3-piece-stick-combo-pack",
    alt: "The Meru Dhoop Sticks – Combo Pack of 3 (150g)",
    imgSrc: "/assets/products/the-meru/the-meru-dhoop-sticks-combo-3.webp",
    alt2: "The Meru Dhoop Sticks – Indian Rose, Kesar Chandan & Lavender",
    imgSrc2: "/assets/products/the-meru/the-meru-dhoop-sticks-hover.webp",
    label: "The Meru Dhoop Sticks – Combo Pack of 3 (150g)",
    label2: "Indian Rose, Kesar Chandan & Lavender (150g)",
    id: "AddProductForm-the-meru-dhoop-sticks-combo-3",
    id2: "BtnAddProduct-the-meru-dhoop-sticks-combo-3",
    label3: "₹400",
    label4: "₹300",
    label5: "25% OFF",
  },
  {
    ariaLabel: "3 / 3",
    href: "/products/mouth-freshener-quartet-4-packs",
    alt: "Mouth Freshener Quartet (4 packs)",
    imgSrc: "/assets/products/the-meru/mouth-freshener-quartet-4-packs.webp",
    alt2: "Mouth Freshener Quartet (4 packs)",
    imgSrc2: "/assets/products/the-meru/mouth-freshener-quartet-4-packs.webp",
    label: "Mouth Freshener Quartet (4 packs)",
    label2: "Quartet • 4 Refreshing Blends",
    id: "AddProductForm-the-meru-mouth-freshener-quartet",
    id2: "BtnAddProduct-the-meru-mouth-freshener-quartet",
    label3: "₹1,600",
    label4: "₹800",
    label5: "50% OFF",
  },
];

export default function LogoCloudSection({ mediaTile2Data = defaultProducts } = {}) {
  return (
    <div className="w-full max-w-[1440px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      {/* 3 Large Product Cards - Stacked vertically on mobile, 3-col grid on desktop */}
      <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-3 md:gap-4 lg:gap-5 py-2 items-stretch">
        {mediaTile2Data.map((d, i) => (
          <div key={i} className="w-full h-full">
            <MediaTile2 d={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
