"use client";

import React, { useState, useEffect, useRef } from "react";
import { SearchIcon, CloseIcon } from "../../design-system/icons";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  { label: "Incense Sticks", href: "/collections/incense-sticks" },
  { label: "Incense Cones", href: "/collections/incense-cones" },
  { label: "Havan Cups", href: "/collections/havan-cups" },
  { label: "Diwali Collection 2026", href: "/collections/diwali" },
  { label: "Banke Bihari Sacred Blend", href: "/collections/banke-bihari-collection" },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-black/40 backdrop-blur-xs transition-opacity duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close search overlay" />

      {/* Main Search Panel */}
      <div className="w-full bg-[#FFFFFF] border-b border-deep-charcoal/10 shadow-lg px-4 sm:px-6 py-6 sm:py-8 animate-in slide-in-from-top-2 duration-250">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-deep-charcoal/10">
            <span className="font-sans text-lg sm:text-xl font-medium text-deep-charcoal tracking-normal">
              Search The Meru Sanctuary
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-deep-charcoal/70 hover:text-meru-gold transition-colors cursor-pointer rounded-full"
              aria-label="Close search"
            >
              <CloseIcon size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative mt-4 flex items-center">
            <SearchIcon size={20} className="absolute left-3.5 text-deep-charcoal/50 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sacred incense, dhoop sticks, cones, rituals..."
              className="w-full bg-sacred-ivory/50 text-deep-charcoal text-sm sm:text-base rounded-[6px] border border-deep-charcoal/15 pl-11 pr-10 py-3 transition-colors focus:outline-hidden focus:border-meru-gold focus:ring-1 focus:ring-meru-gold/40 placeholder:text-muted-foreground/60 font-sans"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3.5 text-xs text-muted-foreground hover:text-deep-charcoal p-1"
                aria-label="Clear query"
              >
                ✕
              </button>
            )}
          </form>

          {/* Suggested Quick Links */}
          <div className="mt-5">
            <span className="text-[11px] font-sans uppercase tracking-widest text-muted-foreground block mb-2 font-semibold">
              Popular Sacred Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1 rounded-[4px] bg-warm-sand/30 hover:bg-meru-gold/15 text-deep-charcoal hover:text-meru-gold text-xs font-sans transition-colors border border-deep-charcoal/10"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
