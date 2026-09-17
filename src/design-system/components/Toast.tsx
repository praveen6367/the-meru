"use client";

import React, { useEffect } from "react";
import { cn } from "../../lib/utils";

export interface ToastProps {
  message: string;
  type?: "info" | "success" | "gold";
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

export function Toast({
  message,
  type = "gold",
  isVisible,
  onClose,
  duration = 3500,
  className,
}: ToastProps) {
  useEffect(() => {
    if (!isVisible || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    info: "bg-surface-card text-deep-charcoal border-deep-charcoal/15",
    success: "bg-botanical text-white border-botanical",
    gold: "bg-sacred-ivory text-deep-charcoal border-meru-gold shadow-gold",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-[8px] border text-xs sm:text-sm font-sans font-medium shadow-card select-none",
          typeStyles[type],
          className
        )}
      >
        <span className="text-meru-gold font-sans">✧</span>
        <span>{message}</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-muted-foreground hover:text-deep-charcoal text-xs p-1"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
