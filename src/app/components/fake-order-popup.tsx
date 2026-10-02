"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, ShieldCheckIcon } from "../../design-system/icons";

interface FakeOrder {
  id: string;
  name: string;
  location: string;
  productTitle: string;
  productSlug: string;
  productImage: string;
  timeAgo: string;
}

const FAKE_ORDERS: FakeOrder[] = [
  {
    id: "ord-1",
    name: "Aditi S.",
    location: "Mumbai, Maharashtra",
    productTitle: "The Meru Dhoop Sticks – Combo Pack of 3",
    productSlug: "the-meru-3-piece-stick-combo-pack",
    productImage: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
    timeAgo: "2 minutes ago",
  },
  {
    id: "ord-2",
    name: "Vikram K.",
    location: "Bengaluru, Karnataka",
    productTitle: "The Meru Dhoop Sticks – Combo Pack of 3",
    productSlug: "the-meru-3-piece-stick-combo-pack",
    productImage: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
    timeAgo: "5 minutes ago",
  },
  {
    id: "ord-3",
    name: "Pooja R.",
    location: "New Delhi",
    productTitle: "The Meru Dhoop Sticks – Combo Pack of 3",
    productSlug: "the-meru-3-piece-stick-combo-pack",
    productImage: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
    timeAgo: "9 minutes ago",
  },
  {
    id: "ord-4",
    name: "Rohit P.",
    location: "Pune, Maharashtra",
    productTitle: "The Meru Dhoop Sticks – Combo Pack of 3",
    productSlug: "the-meru-3-piece-stick-combo-pack",
    productImage: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
    timeAgo: "14 minutes ago",
  },
  {
    id: "ord-5",
    name: "Sneha D.",
    location: "Jaipur, Rajasthan",
    productTitle: "The Meru Dhoop Sticks – Combo Pack of 3",
    productSlug: "the-meru-3-piece-stick-combo-pack",
    productImage: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
    timeAgo: "21 minutes ago",
  },
  {
    id: "ord-6",
    name: "Ananya M.",
    location: "Hyderabad, Telangana",
    productTitle: "The Meru Dhoop Sticks – Combo Pack of 3",
    productSlug: "the-meru-3-piece-stick-combo-pack",
    productImage: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
    timeAgo: "28 minutes ago",
  },
  {
    id: "ord-7",
    name: "Karan G.",
    location: "Ahmedabad, Gujarat",
    productTitle: "The Meru Dhoop Sticks – Combo Pack of 3",
    productSlug: "the-meru-3-piece-stick-combo-pack",
    productImage: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
    timeAgo: "34 minutes ago",
  },
  {
    id: "ord-8",
    name: "Meera V.",
    location: "Kolkata, West Bengal",
    productTitle: "The Meru Dhoop Sticks – Combo Pack of 3",
    productSlug: "the-meru-3-piece-stick-combo-pack",
    productImage: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
    timeAgo: "42 minutes ago",
  },
];

export default function FakeOrderPopup() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isDismissed) return;

    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    let cycleInterval: NodeJS.Timeout;

    // Initial popup display after 4 seconds
    showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop cycle: show for 6 seconds, hide for 9 seconds
    const intervalTime = 15000; // 6s visible + 9s hidden

    cycleInterval = setInterval(() => {
      if (isHoveredRef.current) return;

      // Prepare next order
      setCurrentIndex((prev) => (prev + 1) % FAKE_ORDERS.length);
      setIsVisible(true);

      // Hide after 6 seconds if not hovered
      hideTimeout = setTimeout(() => {
        if (!isHoveredRef.current) {
          setIsVisible(false);
        }
      }, 6000);
    }, intervalTime);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearInterval(cycleInterval);
    };
  }, [mounted, isDismissed]);

  // If user leaves hover while visible, schedule hide after 2.5s
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsVisible(false);
      }
    }, 2500);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsVisible(false);
    // Dismiss temporarily for 60 seconds
    setIsDismissed(true);
    setTimeout(() => {
      setIsDismissed(false);
    }, 60000);
  };

  if (!mounted) return null;

  const currentOrder = FAKE_ORDERS[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6 transition-all duration-500 ease-out max-w-[340px] sm:max-w-[360px] w-[calc(100%-2rem)] sm:w-auto pointer-events-none ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div
        className="pointer-events-auto bg-[#FFFFFF] border border-deep-charcoal/10 rounded-xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.06)] p-3 flex items-center gap-3 relative hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.16)] transition-shadow group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FAF8F5] border border-deep-charcoal/15 text-deep-charcoal/60 hover:text-deep-charcoal hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          title="Dismiss notification"
          aria-label="Dismiss order notification"
        >
          <CloseIcon size={11} />
        </button>

        {/* Product Thumbnail */}
        <Link
          href={`/products/${currentOrder.productSlug}`}
          className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#F8F5EE] border border-deep-charcoal/5 block"
        >
          <Image
            src={currentOrder.productImage}
            alt={currentOrder.productTitle}
            fill
            sizes="48px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Order Details */}
        <Link
          href={`/products/${currentOrder.productSlug}`}
          className="flex-1 min-w-0 flex flex-col gap-0.5 text-left text-deep-charcoal hover:opacity-95"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[11px] font-semibold text-deep-charcoal truncate">
              {currentOrder.name}
            </span>
            <span className="text-deep-charcoal/30 text-[10px]">·</span>
            <span className="font-sans text-[11px] text-[#736B5E] truncate">
              {currentOrder.location}
            </span>
          </div>

          <p className="font-sans text-xs font-medium text-deep-charcoal line-clamp-1 group-hover:text-meru-gold transition-colors">
            {currentOrder.productTitle}
          </p>

          <div className="flex items-center gap-2 pt-0.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-botanical">
              <ShieldCheckIcon size={11} className="text-botanical" />
              Verified Purchase
            </span>
            <span className="text-deep-charcoal/30 text-[9px]">·</span>
            <span className="text-[10px] text-[#8C8274] font-sans">
              {currentOrder.timeAgo}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
