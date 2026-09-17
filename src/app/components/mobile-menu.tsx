"use client";

import React, { useState, useEffect } from "react";
import { CloseIcon, ChevronDownIcon, SearchIcon, UserIcon } from "../../design-system/icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

const LANDING_NAV_ITEMS = [
  { label: "Shop", targetId: "shopify-section-165769448781d7dc80" },
  { label: "Collections", targetId: "shopify-section-collection_category_list_Aw4QGW" },
  { label: "Our Story", targetId: "shopify-section-tw_text_banner_section_r44Yin" },
  { label: "Our Process", targetId: "shopify-section-1528548198130" },
  { label: "Reviews", targetId: "shopify-section-1658756054ba8c44da" },
];

export default function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    onClose();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${targetId}`);
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs sm:max-w-sm bg-[#FFFFFF] shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Header: Logo & Close */}
        <div className="flex items-center justify-between p-4 border-b border-deep-charcoal/10">
          <a
            href="#the-meru-hero-banner"
            onClick={(e) => handleScrollTo(e, "the-meru-hero-banner")}
            title="THE MERU"
          >
            <img
              src="/assets/cloned/Logo.jpeg"
              alt="THE MERU"
              className="h-8 w-auto object-contain"
            />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Search Bar Action */}
        <div className="p-4 border-b border-deep-charcoal/10">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] bg-sacred-ivory/80 text-deep-charcoal/70 hover:text-deep-charcoal border border-deep-charcoal/15 text-xs font-sans text-left transition-colors cursor-pointer"
          >
            <SearchIcon size={16} className="text-deep-charcoal/50" />
            <span>Search products, rituals, scents...</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 divide-y divide-deep-charcoal/10 font-sans text-sm">
          {LANDING_NAV_ITEMS.map((item) => (
            <div key={item.label} className="py-2">
              <a
                href={`#${item.targetId}`}
                onClick={(e) => handleScrollTo(e, item.targetId)}
                className="block py-2 text-xs uppercase tracking-wider font-semibold text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>

        {/* Footer Account & Tagline */}
        <div className="p-4 border-t border-deep-charcoal/10 bg-sacred-ivory/50 space-y-3">
          <div className="flex items-center gap-4 text-xs font-sans font-medium text-deep-charcoal">
            <a
              href="/account/login"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 hover:text-meru-gold transition-colors"
            >
              <UserIcon size={16} withBolt={false} />
              <span>Log In</span>
            </a>
            <span className="text-deep-charcoal/20">|</span>
            <a
              href="/account/register"
              onClick={onClose}
              className="hover:text-meru-gold transition-colors"
            >
              Register
            </a>
          </div>

          <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">
            THE MERU — Contemporary Indian luxury with sacred spiritual character.
          </p>
        </div>
      </div>
    </>
  );
}
