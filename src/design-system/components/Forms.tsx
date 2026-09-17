"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

// -------------------------------------------------------------
// 1. TEXT INPUT
// -------------------------------------------------------------
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 font-sans">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold tracking-wider uppercase text-deep-charcoal">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-muted-foreground pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-sacred-ivory text-deep-charcoal text-sm rounded-[6px] border border-deep-charcoal/15 px-3.5 py-2.5 transition-all duration-200",
              "placeholder:text-muted-foreground/60 focus:outline-hidden focus:border-meru-gold focus:ring-2 focus:ring-meru-gold/20",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-terracotta focus:border-terracotta focus:ring-terracotta/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-muted-foreground pointer-events-none flex items-center">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <span className="text-xs text-terracotta">{error}</span>}
        {!error && helperText && <span className="text-xs text-muted-foreground">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

// -------------------------------------------------------------
// 2. TEXTAREA
// -------------------------------------------------------------
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 font-sans">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold tracking-wider uppercase text-deep-charcoal">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            "w-full bg-sacred-ivory text-deep-charcoal text-sm rounded-[6px] border border-deep-charcoal/15 px-3.5 py-2.5 transition-all duration-200",
            "placeholder:text-muted-foreground/60 focus:outline-hidden focus:border-meru-gold focus:ring-2 focus:ring-meru-gold/20 resize-y",
            error && "border-terracotta focus:border-terracotta focus:ring-terracotta/20",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-terracotta">{error}</span>}
        {!error && helperText && <span className="text-xs text-muted-foreground">{helperText}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// -------------------------------------------------------------
// 3. SELECT
// -------------------------------------------------------------
export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 font-sans">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold tracking-wider uppercase text-deep-charcoal">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              "w-full appearance-none bg-sacred-ivory text-deep-charcoal text-sm rounded-[6px] border border-deep-charcoal/15 px-3.5 py-2.5 pr-9 transition-all duration-200",
              "focus:outline-hidden focus:border-meru-gold focus:ring-2 focus:ring-meru-gold/20 cursor-pointer",
              error && "border-terracotta focus:border-terracotta focus:ring-terracotta/20",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-deep-charcoal text-xs">
            ▼
          </span>
        </div>
        {error && <span className="text-xs text-terracotta">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";

// -------------------------------------------------------------
// 4. CHECKBOX
// -------------------------------------------------------------
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2.5 cursor-pointer select-none font-sans text-sm text-deep-charcoal">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className={cn(
            "w-4 h-4 rounded-[3px] border border-deep-charcoal/30 bg-sacred-ivory text-meru-gold",
            "focus:ring-2 focus:ring-meru-gold/30 accent-meru-gold cursor-pointer transition-colors",
            className
          )}
          {...props}
        />
        {label && <span className="leading-snug">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

// -------------------------------------------------------------
// 5. RADIO
// -------------------------------------------------------------
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2.5 cursor-pointer select-none font-sans text-sm text-deep-charcoal">
        <input
          ref={ref}
          type="radio"
          id={inputId}
          className={cn(
            "w-4 h-4 border border-deep-charcoal/30 bg-sacred-ivory text-meru-gold",
            "focus:ring-2 focus:ring-meru-gold/30 accent-meru-gold cursor-pointer transition-colors",
            className
          )}
          {...props}
        />
        {label && <span className="leading-snug">{label}</span>}
      </label>
    );
  }
);
Radio.displayName = "Radio";

// -------------------------------------------------------------
// 6. SEARCH FIELD
// -------------------------------------------------------------
export interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  onClear?: () => void;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ onSearch, onClear, className, value, onChange, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <span className="absolute left-3.5 text-muted-foreground pointer-events-none text-sm">
          🔍
        </span>
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search products, rituals, scents..."
          className={cn(
            "w-full bg-sacred-ivory text-deep-charcoal text-xs sm:text-sm rounded-[6px] border border-deep-charcoal/15 pl-9 pr-8 py-2 transition-all duration-200",
            "placeholder:text-muted-foreground/60 focus:outline-hidden focus:border-meru-gold focus:ring-2 focus:ring-meru-gold/20",
            className
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-muted-foreground hover:text-deep-charcoal text-xs"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);
SearchField.displayName = "SearchField";

// -------------------------------------------------------------
// 7. QUANTITY SELECTOR
// -------------------------------------------------------------
export interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  quantity,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const sizeStyles = {
    sm: "h-7 text-xs",
    md: "h-9 text-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border border-deep-charcoal/20 rounded-[6px] bg-sacred-ivory overflow-hidden select-none font-sans",
        sizeStyles[size],
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="px-2.5 h-full flex items-center justify-center text-deep-charcoal hover:bg-warm-sand/40 active:bg-warm-sand disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="px-3 min-w-[2rem] text-center font-medium text-deep-charcoal">
        {quantity}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="px-2.5 h-full flex items-center justify-center text-deep-charcoal hover:bg-warm-sand/40 active:bg-warm-sand disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
