import React from "react";
import { cn } from "../../lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  withDivider?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  withDivider = false,
  className,
  ...props
}: SectionHeadingProps) {
  const alignMap = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col mb-10 sm:mb-14", alignMap[align], className)} {...props}>
      {eyebrow && (
        <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-meru-gold mb-2.5">
          {eyebrow}
        </span>
      )}

      <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-deep-charcoal leading-[1.12]">
        {title}
      </h2>

      {description && (
        <p className="mt-3.5 max-w-2xl font-sans text-sm sm:text-base text-earth/85 leading-relaxed">
          {description}
        </p>
      )}

      {withDivider && (
        <div className="w-16 h-[2px] bg-meru-gold/40 mt-5 rounded-full" />
      )}
    </div>
  );
}
