"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-deep-charcoal/10 border-y border-deep-charcoal/10 font-sans", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="py-4">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left group cursor-pointer focus-visible:outline-hidden focus-visible:text-meru-gold"
              aria-expanded={isOpen}
            >
              <span className="font-sans text-base sm:text-lg text-deep-charcoal font-medium group-hover:text-meru-gold transition-colors">
                {item.title}
              </span>
              <span
                className={cn(
                  "ml-4 text-xs text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180 text-meru-gold"
                )}
              >
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="pt-3 pb-1 text-sm text-earth leading-relaxed font-sans animate-in fade-in duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
