"use client";

import React from "react";
import { cn } from "../../lib/utils";

// -------------------------------------------------------------
// NAV LINK
// -------------------------------------------------------------
export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}

export function NavLink({ isActive, className, children, ...props }: NavLinkProps) {
  return (
    <a
      className={cn(
        "relative py-1 font-sans text-xs tracking-widest uppercase transition-colors select-none group inline-flex items-center",
        isActive ? "text-meru-gold font-semibold" : "text-deep-charcoal/90 hover:text-meru-gold font-medium",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[1.5px] bg-meru-gold transition-all duration-200 ease-out",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </a>
  );
}

// -------------------------------------------------------------
// CART BUTTON
// -------------------------------------------------------------
export interface CartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number;
}

export function CartButton({ count = 0, className, ...props }: CartButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative p-2 text-deep-charcoal hover:text-meru-gold transition-colors inline-flex items-center justify-center cursor-pointer",
        className
      )}
      aria-label={`Cart with ${count} items`}
      {...props}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-meru-gold text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
          {count}
        </span>
      )}
    </button>
  );
}

// -------------------------------------------------------------
// MOBILE MENU TRIGGER
// -------------------------------------------------------------
export interface MobileMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export function MobileMenuTrigger({ isOpen, className, ...props }: MobileMenuTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2 text-deep-charcoal hover:text-meru-gold cursor-pointer transition-colors",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      {...props}
    >
      <span
        className={cn(
          "w-5 h-[1.5px] bg-current transition-all duration-200",
          isOpen && "rotate-45 translate-y-[4.5px]"
        )}
      />
      <span
        className={cn(
          "w-5 h-[1.5px] bg-current transition-opacity duration-200",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "w-5 h-[1.5px] bg-current transition-all duration-200",
          isOpen && "-rotate-45 -translate-y-[4.5px]"
        )}
      />
    </button>
  );
}
