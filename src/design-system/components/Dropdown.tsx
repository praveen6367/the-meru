"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

export interface DropdownItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({ trigger, items, align = "left", className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 w-48 rounded-[8px] bg-sacred-ivory border border-deep-charcoal/10 shadow-card py-1.5 z-50 animate-in fade-in duration-150",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {items.map((item) => {
            const content = (
              <span className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-sans text-deep-charcoal hover:bg-warm-sand/50 hover:text-meru-gold transition-colors cursor-pointer">
                {item.icon && <span className="text-xs">{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            );

            if (item.href) {
              return (
                <a key={item.id} href={item.href} onClick={() => setIsOpen(false)}>
                  {content}
                </a>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                className="w-full text-left"
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
