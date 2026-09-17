"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "text";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  withArrow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  glare?: boolean;
}

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  glare?: boolean;
}

/**
 * Signature The Meru Slender Right Arrow SVG.
 * Moves smoothly right by 4-6px on parent hover without jumping or bouncing.
 */
export function MeruArrow({ className }: { className?: string }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "transition-transform duration-300 ease-out group-hover:translate-x-1.5 shrink-0 inline-block pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/**
 * Centralized The Meru Button System Variant Tokens
 */
export const buttonVariantStyles: Record<ButtonVariant, string> = {
  // Signature 3D Copper-Platinum Finish Golden Gradient Button (Borderless 3D Edition)
  primary:
    "meru-btn-copper-platinum font-semibold tracking-[0.13em] border-none",

  // Refined White/Ivory surface with delicate gold/charcoal border
  secondary:
    "bg-sacred-ivory text-[#1E160D] border border-[#C99A28]/50 shadow-2xs hover:bg-[#F2ECE0] hover:border-[#C99A28] hover:text-black hover:-translate-y-px active:translate-y-0 active:scale-[0.99] font-medium",

  // Clean Transparent Gold Outline
  outline:
    "bg-transparent text-[#1E160D] border border-[#C99A28] hover:bg-[#C99A28]/10 hover:border-[#9E7412] hover:-translate-y-px active:translate-y-0 font-medium",

  // Minimal Ghost
  ghost:
    "bg-transparent text-[#1E160D] hover:bg-warm-sand/40 hover:text-meru-gold active:bg-warm-sand/60 font-medium",

  // Elegant text link with arrow
  text:
    "bg-transparent text-[#1E160D] hover:text-meru-gold underline-offset-4 hover:underline p-0 h-auto font-medium tracking-wide",
};

/**
 * Height, Padding & Typography Tokens
 */
export const buttonSizeStyles: Record<ButtonSize, string> = {
  // Compact / Small Actions (38-40px height)
  sm: "h-10 px-4 text-xs tracking-[0.11em] rounded-[2px] gap-2.5",

  // Standard CTA & Product Actions (46-48px height)
  md: "h-12 px-6 sm:px-7 text-[13px] sm:text-[14px] tracking-[0.13em] rounded-[3px] gap-3",

  // Large Campaign & Hero CTA (50-54px height)
  lg: "h-[50px] sm:h-[54px] px-8 sm:px-9 text-sm sm:text-[15px] tracking-[0.14em] rounded-[3px] gap-3.5",
};

/**
 * Reusable The Meru Primary Button Component.
 * Supports: glare animation, arrow hover motion, accessible focus, tactile pressed state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      withArrow = true,
      leftIcon,
      rightIcon,
      fullWidth = false,
      glare = true,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isText = variant === "text";
    const shouldGlare = variant === "primary" && glare && !disabled && !isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center select-none cursor-pointer transition-all duration-200 ease-out font-sans uppercase group relative whitespace-nowrap text-center",
          "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C99A28] focus-visible:ring-offset-2 focus-visible:ring-offset-sacred-ivory",
          !isText && buttonSizeStyles[size],
          buttonVariantStyles[variant],
          shouldGlare && "meru-btn-glare",
          fullWidth && "w-full",
          (disabled || isLoading) &&
            "opacity-50 cursor-not-allowed pointer-events-none filter grayscale-[30%]",
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        )}

        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}

        <span className="relative z-1">{children}</span>

        {!isLoading && rightIcon && <span className="inline-flex shrink-0 relative z-1">{rightIcon}</span>}

        {!isLoading && withArrow && !rightIcon && !isText && (
          <span className="relative z-1 inline-flex items-center">
            <MeruArrow />
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

/**
 * Reusable The Meru Anchor / Link Button.
 * Same visual and motion tokens as Button, rendered as <a> for semantic navigation.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      withArrow = true,
      leftIcon,
      rightIcon,
      fullWidth = false,
      glare = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isText = variant === "text";
    const shouldGlare = variant === "primary" && glare;

    return (
      <a
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center select-none cursor-pointer transition-all duration-200 ease-out font-sans uppercase group relative whitespace-nowrap text-center no-underline",
          "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C99A28] focus-visible:ring-offset-2 focus-visible:ring-offset-sacred-ivory",
          !isText && buttonSizeStyles[size],
          buttonVariantStyles[variant],
          shouldGlare && "meru-btn-glare",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}

        <span className="relative z-1">{children}</span>

        {rightIcon && <span className="inline-flex shrink-0 relative z-1">{rightIcon}</span>}

        {withArrow && !rightIcon && !isText && (
          <span className="relative z-1 inline-flex items-center">
            <MeruArrow />
          </span>
        )}
      </a>
    );
  }
);
LinkButton.displayName = "LinkButton";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "solid";
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "md", variant = "ghost", label, className, children, disabled, ...props }, ref) => {
    const sizeMap = {
      sm: "w-8 h-8 p-1 text-xs rounded-[2px]",
      md: "w-10 h-10 p-2 text-sm rounded-[3px]",
      lg: "w-12 h-12 p-2.5 text-base rounded-[3px]",
    };

    const variantMap = {
      ghost: "text-deep-charcoal hover:text-meru-gold hover:bg-warm-sand/40",
      outline: "text-deep-charcoal border border-border hover:border-meru-gold hover:text-meru-gold bg-transparent",
      solid: "bg-surface-2 text-deep-charcoal hover:bg-meru-gold hover:text-white border border-border/40",
    };

    return (
      <button
        ref={ref}
        aria-label={label}
        title={label}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer transition-all duration-200 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-meru-gold/60",
          sizeMap[size],
          variantMap[variant],
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
