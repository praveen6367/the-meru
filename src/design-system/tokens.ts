/**
 * THE MERU DESIGN SYSTEM - TOKENS
 * Brand Philosophy: Contemporary Indian Ritual + Quiet Luxury + Craftsmanship
 * Visual Balance: Sacred Ivory / Neutral Foundation + Deep Charcoal Typography + Intentional Meru Gold Accents
 */

export const colors = {
  // 1. Primary Backgrounds & Foundation Surfaces
  sacredIvory: "#F8F5EE",
  warmSand: "#E9DDC9",
  surfaceLight: "#FAF8F5",
  surfaceCard: "#F1E9DC",
  surfaceMuted: "#ECE5D8",

  // 2. Primary Typography & Editorial Text
  deepCharcoal: "#1E1C19",
  earth: "#46382B",
  mutedEarth: "#6B5E51",
  subtleEarth: "#8D7F72",

  // 3. Brand Golds (Accents & Strategic Actions - Never Dominant)
  meruGold: "#C99A28",
  highlightGold: "#E0B94A",
  goldBorder: "rgba(201, 154, 40, 0.35)",
  goldGlow: "rgba(201, 154, 40, 0.18)",
  goldSubtle: "rgba(201, 154, 40, 0.1)",

  // 4. Restrained Natural & Spiritual Accents
  botanical: "#465542",
  botanicalLight: "#62745D",
  terracotta: "#9D5B3D",
  terracottaLight: "#B87352",

  // 5. Borders & Dividers
  borderSubtle: "rgba(30, 28, 25, 0.08)",
  borderMedium: "rgba(30, 28, 25, 0.16)",
  borderGoldHairline: "rgba(201, 154, 40, 0.35)",

  // 6. Utility
  white: "#FFFFFF",
  pureBlack: "#000000",
} as const;

export const typography = {
  fonts: {
    serif: 'var(--font-meru-sans, "Plus Jakarta Sans", "Inter", "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    sans: 'var(--font-meru-sans, "Plus Jakarta Sans", "Inter", "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
  },
  sizes: {
    displayXl: "font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] text-deep-charcoal",
    displayL: "font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-deep-charcoal",
    h1: "font-sans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-[1.18] text-deep-charcoal",
    h2: "font-sans text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.22] text-deep-charcoal",
    h3: "font-sans text-lg sm:text-xl md:text-2xl font-medium tracking-normal leading-snug text-deep-charcoal",
    h4: "font-sans text-base sm:text-lg font-medium tracking-normal leading-snug text-deep-charcoal",
    bodyLarge: "font-sans text-base sm:text-lg font-normal leading-relaxed text-earth",
    body: "font-sans text-sm sm:text-base font-normal leading-relaxed text-earth",
    bodySmall: "font-sans text-xs sm:text-sm font-normal leading-normal text-muted-foreground",
    caption: "font-sans text-[11px] sm:text-xs font-medium tracking-widest uppercase text-muted-foreground",
    label: "font-sans text-xs font-semibold tracking-wider uppercase text-deep-charcoal",
    button: "font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase",
  },
} as const;

export const radius = {
  none: "rounded-none",
  sm: "rounded-[4px]",
  md: "rounded-[8px]",
  lg: "rounded-[12px]",
  xl: "rounded-[16px]",
  full: "rounded-full",
} as const;

export const shadows = {
  subtle: "shadow-[0_1px_3px_rgba(30,28,25,0.05),0_1px_2px_rgba(30,28,25,0.03)]",
  card: "shadow-[0_4px_14px_-2px_rgba(30,28,25,0.06),0_2px_6px_-1px_rgba(30,28,25,0.03)]",
  hover: "shadow-[0_12px_28px_-4px_rgba(30,28,25,0.1),0_4px_10px_-2px_rgba(30,28,25,0.04)]",
  gold: "shadow-[0_4px_18px_-2px_rgba(201,154,40,0.25)]",
} as const;

export const motion = {
  transitionFast: "transition-all duration-150 ease-out",
  transitionNormal: "transition-all duration-250 ease-out",
  transitionSlow: "transition-all duration-400 cubic-bezier(0.16, 1, 0.3, 1)",
  arrowTranslate: "group-hover:translate-x-1 transition-transform duration-200 ease-out",
  imageZoom: "group-hover:scale-105 transition-transform duration-500 ease-out",
} as const;

export const spacing = {
  sectionPy: "py-16 sm:py-20 md:py-24",
  sectionGap: "space-y-16 sm:space-y-20 md:space-y-24",
  containerMax: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  editorialMax: "max-w-4xl mx-auto px-4 sm:px-6",
  narrowMax: "max-w-2xl mx-auto px-4 sm:px-6",
  wideCommerce: "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12",
} as const;

export const imageTreatments = {
  standard: "object-cover",
  warm: "object-cover contrast-[1.02] brightness-[0.98] sepia-[0.04]",
  soft: "object-cover contrast-[0.98] brightness-[1.01]",
  editorial: "object-cover filter contrast-[1.04] saturate-[0.96]",
  product: "object-contain mix-blend-multiply",
} as const;

export const brandDetails = {
  goldDivider: "h-[1px] w-full bg-gradient-to-r from-transparent via-[#C99A28]/40 to-transparent",
  goldDividerSolid: "h-[1px] w-full bg-[#C99A28]/30",
  ritualMotif: "✧",
  ritualCircle: "w-2 h-2 rounded-full bg-meru-gold/60 inline-block",
} as const;
