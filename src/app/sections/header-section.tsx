"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import {
  SearchIcon,
  UserIcon,
  CartBagIcon,
  MenuIcon,
  ChevronDownIcon,
} from "../../design-system/icons";
import CartDrawer from "../components/cart-drawer";
import MobileMenu from "../components/mobile-menu";
import SearchOverlay from "../components/search-overlay";

const LANDING_NAV_ITEMS = [
  { label: "Shop", targetId: "shopify-section-165769448781d7dc80" },
  { label: "Collections", targetId: "shopify-section-collection_category_list_Aw4QGW" },
  { label: "Our Story", targetId: "shopify-section-tw_text_banner_section_r44Yin" },
  { label: "Our Process", targetId: "shopify-section-1528548198130" },
  { label: "Reviews", targetId: "shopify-section-1658756054ba8c44da" },
];

export default function HeaderSection() {
  const { totalCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const accountMenuRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${targetId}`);
    } else {
      window.location.href = targetId === "the-meru-hero-banner" ? "/" : `/#${targetId}`;
    }
  };

  // Detect scroll for sticky header elevation & compact state
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close account menu on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`w-full sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border-b border-deep-charcoal/10"
            : "border-b border-deep-charcoal/10"
        }`}
        id="shopify-section-header"
      >
        {/* =========================================================================
            DESKTOP HEADER (Hidden on mobile / tablet < 1024px)
            Clean 3-Zone Layout: LEFT Logo | CENTER Navigation | RIGHT Actions
           ========================================================================= */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6 xl:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "py-2.5" : "py-3.5"
            }`}
          >
            {/* ZONE 1 (LEFT): The Meru Brand Mark */}
            <div className="w-[220px] shrink-0 flex items-center justify-start">
              <a
                href="#the-meru-hero-banner"
                onClick={(e) => handleScrollTo(e, "the-meru-hero-banner")}
                className="inline-block hover:opacity-95 transition-opacity cursor-pointer"
                title="THE MERU"
              >
                <img
                  src="/assets/cloned/Logo.jpeg"
                  alt="THE MERU"
                  className={`w-auto object-contain transition-all duration-300 ${
                    isScrolled ? "h-7.5 xl:h-8" : "h-9 xl:h-10"
                  }`}
                />
              </a>
            </div>

            {/* ZONE 2 (CENTER): Primary Navigation */}
            <nav
              className="flex-1 flex items-center justify-center font-sans"
              aria-label="Primary navigation"
            >
              <ul className="flex items-center gap-6 xl:gap-8 [list-style-type:none]">
                {LANDING_NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={`#${item.targetId}`}
                      onClick={(e) => handleScrollTo(e, item.targetId)}
                      className="inline-block text-[13px] xl:text-[14px] font-medium text-deep-charcoal hover:text-meru-gold uppercase tracking-wider py-2 transition-colors relative group whitespace-nowrap cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-meru-gold transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ZONE 3 (RIGHT): Search, Account, Cart */}
            <div className="w-[220px] shrink-0 flex items-center justify-end gap-3.5 xl:gap-4.5 text-deep-charcoal">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer rounded-full"
                aria-label="Search"
                title="Search products"
              >
                <SearchIcon size={20} />
              </button>

              {/* Account Popover */}
              <div
                ref={accountMenuRef}
                className="relative"
                onMouseEnter={() => setAccountMenuOpen(true)}
                onMouseLeave={() => setAccountMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="p-2 text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer rounded-full"
                  aria-label="Account"
                  title="Account"
                >
                  <UserIcon size={20} />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 top-full mt-0 pt-2 w-44 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-[#FFFFFF] border border-deep-charcoal/10 rounded-[8px] shadow-lg py-2 font-sans text-xs divide-y divide-deep-charcoal/5">
                      <div className="px-3.5 py-1.5 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                        My Account
                      </div>
                      <div className="py-1">
                        <a
                          href="/account/login"
                          className="block px-3.5 py-1.5 text-deep-charcoal hover:bg-sacred-ivory hover:text-meru-gold transition-colors"
                        >
                          Log In
                        </a>
                        <a
                          href="/account/register"
                          className="block px-3.5 py-1.5 text-deep-charcoal hover:bg-sacred-ivory hover:text-meru-gold transition-colors"
                        >
                          Register
                        </a>
                      </div>
                      <div className="py-1">
                        <a
                          href="https://phoolco.shipway.com/track"
                          className="block px-3.5 py-1.5 text-deep-charcoal hover:bg-sacred-ivory hover:text-meru-gold transition-colors"
                        >
                          Track My Order
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Drawer Trigger with Dynamic Badge */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer flex items-center justify-center rounded-full"
                aria-label={`Shopping bag with ${totalCount} items`}
                title="View cart"
              >
                <CartBagIcon size={21} />
                {totalCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-meru-gold text-deep-charcoal font-sans font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#FFFFFF] shadow-xs">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET HEADER (< 1024px)
            Layout: LEFT Hamburger | CENTER Logo | RIGHT Search, Account & Cart
           ========================================================================= */}
        <div className="lg:hidden px-3 sm:px-4 py-2.5 flex items-center justify-between">
          {/* Left: Hamburger menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Open mobile menu"
          >
            <MenuIcon size={22} />
          </button>

          {/* Center: The Meru Logo */}
          <a
            href="#the-meru-hero-banner"
            onClick={(e) => handleScrollTo(e, "the-meru-hero-banner")}
            className="block cursor-pointer"
            title="THE MERU"
          >
            <img
              src="/assets/cloned/Logo.jpeg"
              alt="THE MERU"
              className="h-7 sm:h-8 w-auto object-contain mx-auto"
            />
          </a>

          {/* Right: Search, Account & Cart */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Search"
            >
              <SearchIcon size={19} />
            </button>

            <a
              href="/account/login"
              className="p-2 text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Account"
              title="Account"
            >
              <UserIcon size={19} />
            </a>

            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label={`Cart with ${totalCount} items`}
            >
              <CartBagIcon size={20} />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 bg-meru-gold text-deep-charcoal font-sans font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-[#FFFFFF] shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Search Modal Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
