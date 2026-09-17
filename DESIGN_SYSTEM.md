# THE MERU — BRAND DESIGN SYSTEM FOUNDATION

> **Philosophy**: Contemporary Indian Ritual + Quiet Luxury + Craftsmanship  
> **Aesthetic Archetype**: Editorial Serenity, Sacred Tactility, Restrained Gold Actions, Warm Ivory Foundations  
> **Visual Principle**: Never a loud wedding/gold site, never a generic Ayurveda/eco startup. High contrast, generous whitespace, dignified typography.

---

## 1. Color Palette & Design Tokens

Centralized in `src/design-system/tokens.ts` and configured globally via CSS variables in `src/app/globals.css`.

| Token Name | Hex Value / Variable | Purpose & Role |
| :--- | :--- | :--- |
| **Sacred Ivory** | `#F8F5EE` (`--sacred-ivory`) | Primary background & clean paper canvas |
| **Warm Sand** | `#E9DDC9` (`--warm-sand`) | Secondary background, panel depth, soft warmth |
| **Deep Charcoal** | `#1E1C19` (`--deep-charcoal`) | Primary typography, high-contrast headings & icons |
| **Earth** | `#46382B` (`--earth`) | Secondary editorial text, descriptions, body copy |
| **Muted Earth** | `#6B5E51` (`--muted-foreground`) | Meta labels, timestamps, helper text |
| **Meru Gold** | `#C99A28` (`--meru-gold`) | **Primary Action & Accent** (Never dominant background) |
| **Highlight Gold** | `#E0B94A` (`--meru-gold-light`)| Button hover states, active glows, accents |
| **Botanical** | `#465542` (`--botanical`) | Restrained natural accent, sustainability tags, success states |
| **Terracotta** | `#9D5B3D` (`--terracotta`) | Restrained earthen accent, sale tags, warning alerts |

### Golden Rule of Gold Usage
- **Meru Gold is strictly an accent and action color.**
- Do **not** make entire backgrounds gold.
- Do **not** use gold body text everywhere.
- Maintain the balance: **80% Sacred Ivory/Neutral + 15% Deep Charcoal Typography + 5% Meru Gold Accents**.

---

## 2. Typography System

The typography hierarchy uses Google Fonts loaded cleanly in `globals.css`:
- **Editorial Headings & Brand Emotion**: `Cormorant Garamond` (Serif)
- **Commerce, Interface & Navigation**: `Plus Jakarta Sans` (Clean Sans-serif)

| Token Scale | Class Combination | Usage |
| :--- | :--- | :--- |
| **Display XL** | `font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.06]` | Hero emotional statements, editorial pull quotes |
| **Display L** | `font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-[1.1]` | Major feature headers |
| **H1** | `font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-normal` | Page and section titles |
| **H2** | `font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-normal` | Component & collection headers |
| **H3** | `font-serif text-lg sm:text-xl md:text-2xl font-medium` | Product titles, card headings |
| **Body Large** | `font-sans text-base sm:text-lg font-normal text-earth leading-relaxed` | Editorial paragraphs, lead text |
| **Body** | `font-sans text-sm sm:text-base font-normal text-earth leading-relaxed` | Standard content copy |
| **Body Small** | `font-sans text-xs sm:text-sm font-normal text-muted-foreground` | Product specifications, sub-captions |
| **Caption** | `font-sans text-[11px] sm:text-xs font-medium tracking-widest uppercase text-muted-foreground` | Category labels, badges |
| **Button** | `font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase` | Action triggers, CTA buttons |

---

## 3. Reusable Component Library

Import all components directly from `@/design-system` or `src/design-system`:

```tsx
import {
  Button,
  IconButton,
  LinkButton,
  Badge,
  Price,
  ProductCard,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  SearchField,
  QuantitySelector,
  Card,
  Divider,
  SectionHeading,
  Container,
  Accordion,
  Dropdown,
  Modal,
  Toast,
  LoadingState,
  NavLink,
  CartButton,
  MobileMenuTrigger,
} from "@/design-system";
```

### 3.1 Buttons (`Button`, `IconButton`, `LinkButton`)
- **Variants**: `primary` (Meru Gold with subtle border & arrow `→`), `secondary` (Ivory with charcoal border & gold hover), `outline`, `ghost`, `link`.
- **States supported**: Default, Hover (subtle color shift + arrow motion), Active, Focus-visible (gold outline ring), Disabled, Loading (with spinning gold loader).
- **Example**:
  ```tsx
  <Button variant="primary" withArrow>
    DISCOVER THE RITUAL
  </Button>

  <Button variant="secondary">
    VIEW INGREDIENTS
  </Button>
  ```

### 3.2 Badges (`Badge`)
- **Variants**: `sale`, `new`, `bestseller`, `limited`, `handcrafted`, `ritual`, `outline`.
- Restrained, compact, high-contrast, editorial styling.

### 3.3 Product Card (`ProductCard`)
- Quiet luxury design supporting:
  - High quality imagery with subtle scale transition (`105%` scale over 500ms).
  - Hover image swap (`hoverImageSrc`).
  - Restrained sale / ritual badges.
  - Price formatting with compare-at strikethrough & discount indicator.
  - Elegant hover "ADD TO CART" drawer action.
  - Clean Cormorant Garamond title and category indicator.

### 3.4 Form System (`Forms.tsx`)
- All form elements (`Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `SearchField`, `QuantitySelector`) use **Sacred Ivory** backgrounds, subtle charcoal borders, and accessible Meru Gold focus rings.

### 3.5 Brand Motifs & Dividers (`Divider.tsx`)
- Thin hairline gold lines: `variant="gold-hairline"`
- Gradient gold fade: `variant="gold-gradient"`
- Ritual centered sacred glyph: `variant="with-motif"` (`✧`)

---

## 4. Spacing, Radius & Shadows

| Token Category | Values / Classes | Character |
| :--- | :--- | :--- |
| **Corner Radius** | `rounded-[4px]`, `rounded-[6px]`, `rounded-[8px]`, `rounded-[12px]` | Restrained, architectural, tactile (no giant pill shapes) |
| **Elevation** | `shadow-subtle`, `shadow-card`, `shadow-hover`, `shadow-gold` | Soft natural elevation mimicking handmade paper and stone |
| **Containers** | `full`, `standard` (1280px), `wide` (1440px), `editorial` (896px), `narrow` (672px) | Harmonious layout rhythm |

---

## 5. How Future Section Redesigns Should Proceed

When transitioning an existing cloned section into The Meru brand aesthetic in subsequent phases:

1. **Keep section anchors, ids, and working functionality**: Preserve `id="shopify-section-..."` or component data bindings.
2. **Replace raw inline styling with Design System tokens**:
   - Swap hardcoded greens/yellows with semantic tokens (`bg-sacred-ivory`, `text-deep-charcoal`, `text-meru-gold`).
   - Swap system font headers with `font-serif` (Cormorant Garamond) or `<SectionHeading />`.
   - Swap buttons with `<Button variant="primary" withArrow />`.
   - Use `<Container size="standard">` for responsive consistency.
3. **Use the brand logo**: Always reference `/assets/cloned/Logo.jpeg`.
