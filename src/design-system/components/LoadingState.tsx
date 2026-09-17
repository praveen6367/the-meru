import React from "react";
import { cn } from "../../lib/utils";

export interface LoadingStateProps {
  type?: "spinner" | "skeleton-card" | "skeleton-text";
  count?: number;
  className?: string;
}

export function LoadingState({ type = "spinner", count = 1, className }: LoadingStateProps) {
  if (type === "spinner") {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 text-meru-gold", className)}>
        <div className="w-8 h-8 border-2 border-meru-gold/20 border-t-meru-gold rounded-full animate-spin" />
        <span className="mt-3 text-xs tracking-widest uppercase font-sans text-muted-foreground">
          Loading...
        </span>
      </div>
    );
  }

  if (type === "skeleton-card") {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 animate-pulse">
            <div className="aspect-square bg-warm-sand/50 rounded-[8px]" />
            <div className="h-4 bg-warm-sand/60 rounded w-3/4" />
            <div className="h-3 bg-warm-sand/40 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2.5 animate-pulse", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-4 bg-warm-sand/50 rounded w-full" />
      ))}
    </div>
  );
}
