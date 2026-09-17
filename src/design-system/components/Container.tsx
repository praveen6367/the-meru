import React from "react";
import { cn } from "../../lib/utils";

export type ContainerSize = "full" | "standard" | "narrow" | "editorial" | "wide";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  as?: React.ElementType;
}

const sizeStyles: Record<ContainerSize, string> = {
  full: "w-full",
  standard: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  wide: "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12",
  editorial: "max-w-4xl mx-auto px-4 sm:px-6",
  narrow: "max-w-2xl mx-auto px-4 sm:px-6",
};

export function Container({
  size = "standard",
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component className={cn(sizeStyles[size], className)} {...props}>
      {children}
    </Component>
  );
}
