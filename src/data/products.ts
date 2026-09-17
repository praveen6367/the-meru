export interface ProductAccordionItem {
  title: string;
  content: string | string[];
}

export interface ProductHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  aliases: string[];
  title: string;
  subtitle: string;
  price: number;
  compareAtPrice: number;
  discountPercentage: string;
  netQuantity: string;
  rating: number;
  reviewCount: number;
  badge: string;
  images: {
    src: string;
    alt: string;
  }[];
  overview: string;
  highlights: ProductHighlight[];
  accordions: ProductAccordionItem[];
  relatedProductSlugs: string[];
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  sku: string;
}

export const THE_MERU_PRODUCTS: ProductItem[] = [
  {
    id: "mukhwas-treats-pack-of-6",
    slug: "mukhwas-treats-pack-of-6",
    aliases: ["the-meru-mukhwas-treats", "mukhwas-treats"],
    title: "Mukhwas & Treats (Pack of 6)",
    subtitle: "Pack of 6 • Artisanal Digestive Blends & Festive Treats",
    price: 1200,
    compareAtPrice: 2400,
    discountPercentage: "50% OFF",
    netQuantity: "6 Jars (Approx. 600g total)",
    rating: 4.9,
    reviewCount: 184,
    badge: "50% OFF",
    images: [
      {
        src: "/assets/products/the-meru/mukhwas-treats-pack-of-6.webp",
        alt: "The Meru Mukhwas & Treats (Pack of 6) Artisanal Collection",
      },
      {
        src: "/assets/products/the-meru/mukhwas-treats-pack-of-6.png",
        alt: "The Meru Mukhwas & Treats Pack of 6 Jars View",
      },
    ],
    overview:
      "A tribute to India's time-honored after-meal tradition. The Meru Mukhwas & Treats brings together six distinct artisanal blends, each hand-mixed with sun-dried seeds, fragrant botanicals, edible flowers, and digestive spices. From royal rose-infused fennel to crunchy roasted super-seeds, every jar transforms the closing moments of your meal into a lingering, restorative ritual.",
    highlights: [
      {
        icon: "🌿",
        title: "100% Natural & Vegetarian",
        description: "Zero synthetic additives, artificial colors, or artificial sweeteners.",
      },
      {
        icon: "✨",
        title: "Ayurvedic Heritage",
        description: "Formulated with carminative herbs and seeds that naturally aid digestion.",
      },
      {
        icon: "👐",
        title: "Small-Batch Handcrafted",
        description: "Carefully roasted and prepared in artisanal micro-batches for peak freshness.",
      },
      {
        icon: "🌱",
        title: "Pure Botanical Goodness",
        description: "Rich in plant dietary fiber, healthy fats, and refreshing essential oils.",
      },
    ],
    accordions: [
      {
        title: "The 6 Handcrafted Blends Included",
        content: [
          "1. Royal Gulab Mukhwas – Sun-dried damask rose petals, crisp coriander splits (dhana dal), and delicate fennel seeds.",
          "2. Banarasi Paan Mukhwas – Real betel leaves essence, traditional gulkand infusion, refreshing menthol, and golden fennel.",
          "3. Roasted Flax & Sesame Crunch – Slowly toasted brown flax seeds and white sesame kissed with mineral rock salt.",
          "4. Kashmiri Sweet Saunf – Tender Lucknowi fennel seeds delicately coated with cane crystal sweetness.",
          "5. Chatpat Tangy Amla Digestive – Shredded wild amla dried under gentle sun, tossed with roasted cumin and rock salt.",
          "6. Dry Fruit & Melon Seed Trail – Toasted almond flakes, watermelon seeds, musk melon kernels, and warming digestive spices.",
        ],
      },
      {
        title: "Ingredients & Purity Promise",
        content: [
          "Fennel Seeds (Saunf), Roasted Coriander Splits (Dhana Dal), Roasted White Sesame Seeds, Flax Seeds, Dried Rose Petals (Gulab Patti), Dried Amla, Melon Seeds, Almond Flakes, Pure Gulkand, Cardamom, Mint Extracts, Rock Salt (Sendha Namak), Unrefined Cane Sugar.",
          "Contains tree nuts (almonds) and sesame. 100% vegetarian. Free from artificial colors, high-fructose syrups, and chemical preservatives.",
        ],
      },
      {
        title: "How to Enjoy & Sacred Storage",
        content: [
          "Enjoy a generous teaspoon after meals as a palate cleanser and digestive stimulant, or savor throughout the day as a mindful botanical treat.",
          "Store sealed jars in a cool, dry pantry away from humid air and direct sunlight. To maintain maximum crunch and fragrant essential oils, ensure the lid is sealed tightly after each serving. Best before 9 months from manufacture.",
        ],
      },
      {
        title: "Shipping, Returns & Delivery",
        content: [
          "All orders are packed in eco-conscious, recyclable cartons and dispatched within 24 to 48 hours.",
          "Standard delivery arrives within 3–5 business days across major Indian metros, and 5–7 days for all other pin codes.",
          "Free standard shipping on orders above ₹499. If your package arrives damaged or tampered with, notify us within 48 hours of delivery for a prompt replacement.",
        ],
      },
    ],
    relatedProductSlugs: [
      "the-meru-3-piece-stick-combo-pack",
      "mouth-freshener-quartet-4-packs",
    ],
    stockStatus: "In Stock",
    sku: "MERU-MKW-06",
  },
  {
    id: "the-meru-3-piece-stick-combo-pack",
    slug: "the-meru-3-piece-stick-combo-pack",
    aliases: [
      "the-meru-dhoop-sticks-combo-pack",
      "the-meru-dhoop-sticks-combo-3",
      "the-meru-dhoop-sticks",
    ],
    title: "The Meru Dhoop Sticks – Combo Pack of 3 (150g)",
    subtitle: "Indian Rose, Kesar Chandan & Lavender (150g) • 100% Charcoal-Free",
    price: 300,
    compareAtPrice: 400,
    discountPercentage: "25% OFF",
    netQuantity: "3 Packs (50g each • 150g total)",
    rating: 4.8,
    reviewCount: 242,
    badge: "25% OFF",
    images: [
      {
        src: "/assets/products/the-meru/dhoop/dhoop-hero.jpg",
        alt: "The Meru Dhoop Sticks Combo Pack of 3 Box Packaging",
      },
      {
        src: "/assets/products/the-meru/dhoop/dhoop-ritual.png",
        alt: "The Meru Sacred Dhoop Stick Burning Ritual and Holder",
      },
      {
        src: "/assets/products/the-meru/dhoop/dhoop-sticks-spread.jpg",
        alt: "Hand-rolled Charcoal-Free Dhoop Sticks Texture and Cut",
      },
      {
        src: "/assets/products/the-meru/dhoop/dhoop-box-pack.jpg",
        alt: "The Meru Artisanal Incense Trio Gift Packaging",
      },
      {
        src: "/assets/products/the-meru/dhoop/dhoop-rose-lavender.jpg",
        alt: "The Meru Indian Rose & Lavender Individual Fragrance Boxes",
      },
      {
        src: "/assets/products/the-meru/dhoop/dhoop-kesar-chandan.jpg",
        alt: "The Meru Kesar Chandan Sacred Sandalwood Dhoop Sticks",
      },
    ],
    overview:
      "Bring a gentle, lasting fragrance to your everyday rituals with The Meru 3 Stick Combo Pack. Made with mindful care, these hand-rolled, handmade incense sticks are 100% charcoal-free and designed to fill your space with rich, lingering aromas without choking black smoke. The combo brings together three distinctive fragrances — Indian Rose, Kesar Chandan, and Lavender — giving you a fragrance for every kind of moment, from morning pooja and deep meditation to quiet evenings at home.",
    highlights: [
      {
        icon: "🔥",
        title: "100% Charcoal-Free Formula",
        description: "Zero black soot, zero eye irritation, and clean burning for indoor spaces.",
      },
      {
        icon: "🌸",
        title: "Sacred Upcycled Botanicals",
        description: "Handcrafted using pure temple flower petals and natural natural plant resins.",
      },
      {
        icon: "👐",
        title: "Hand-Rolled with Dignity",
        description: "Hand-rolled by skilled rural women artisans, fostering fair living wages.",
      },
      {
        icon: "🕊️",
        title: "40–45 Mins Burn Time",
        description: "Slow, steady smolder with a complimentary reusable ceramic/brass holder.",
      },
    ],
    accordions: [
      {
        title: "Fragrances Included in the Combo",
        content: [
          "• Indian Rose: Soft, fresh, and deeply romantic floral notes reminiscent of dewy morning rose petals. Ideal for elevating home ambiance and festive ceremonies.",
          "• Kesar Chandan: Majestic Mysore sandalwood enriched with golden saffron threads. Grounding, spiritually resonant, and deeply comforting for daily pooja and meditation.",
          "• Lavender: Delicate, herbaceous, and soul-soothing. Formulated to calm restless minds, relieve evening stress, and encourage deep, restful sleep.",
        ],
      },
      {
        title: "Why The Meru Dhoop Sticks Are Different",
        content: [
          "• 100% Charcoal-Free: Traditional incense burns black charcoal that emits carbon monoxide and sulfur. The Meru uses sacred upcycled temple flowers and botanical bark for a clean, non-toxic burn.",
          "• Hand-Rolled & Handmade: Crafted by women artisans who practice traditional hand-rolling techniques.",
          "• Long-Lasting Fragrance: Enriched with natural essential oils that linger peacefully for hours.",
          "• 100% Biodegradable & Earth Friendly: Even the packaging is plastic-conscious and biodegradable.",
        ],
      },
      {
        title: "How to Light & Sacred Safety Guide",
        content: [
          "1. Hold the tip of a single dhoop stick at a 45-degree angle to a flame and allow it to burn for 5–10 seconds.",
          "2. Gently blow or wave out the flame so only a bright, glowing ember remains at the tip.",
          "3. Secure the stick vertically in the complimentary holder placed on a heat-tolerant flat surface.",
          "Safety Caution: The holder may become warm during prolonged use. Keep away from drafts, open windows, flammable drapery, children, and pets.",
        ],
      },
      {
        title: "Shipping, Returns & Delivery",
        content: [
          "Dispatched from our sacred artisanal workshop in 24–48 hours.",
          "Delivered across India in 3–5 business days with live SMS and tracking updates.",
          "Free shipping on orders above ₹499. Hassle-free replacement if damaged during transit.",
        ],
      },
    ],
    relatedProductSlugs: [
      "mukhwas-treats-pack-of-6",
      "mouth-freshener-quartet-4-packs",
    ],
    stockStatus: "In Stock",
    sku: "MERU-DHP-03",
  },
  {
    id: "mouth-freshener-quartet-4-packs",
    slug: "mouth-freshener-quartet-4-packs",
    aliases: ["mouth-freshener-quartet", "the-meru-mouth-freshener-quartet"],
    title: "Mouth Freshener Quartet (4 packs)",
    subtitle: "Quartet • 4 Artisanal Digestive & Refreshing Blends",
    price: 800,
    compareAtPrice: 1600,
    discountPercentage: "50% OFF",
    netQuantity: "4 Packs (Approx. 400g total)",
    rating: 4.8,
    reviewCount: 156,
    badge: "50% OFF",
    images: [
      {
        src: "/assets/products/the-meru/mouth-freshener-quartet-4-packs.webp",
        alt: "The Meru Mouth Freshener Quartet 4 Packs Collection",
      },
      {
        src: "/assets/products/the-meru/mouth-freshener-quartet-4-packs.png",
        alt: "The Meru Mouth Freshener Quartet Packaging",
      },
    ],
    overview:
      "A harmonious quartet of four distinct Indian digestive blends, crafted to revive the age-old tradition of pure post-meal refreshment. Free from artificial chemicals, saccharin, and synthetic colorants, The Meru Mouth Freshener Quartet combines roasted spices, cooling menthol herbs, pure rose petals, and crunchy seeds for an uplifting sensory finish to every meal.",
    highlights: [
      {
        icon: "🌿",
        title: "100% Natural Digestives",
        description: "Pure botanicals, unadulterated seeds, and genuine aromatic spices.",
      },
      {
        icon: "❄️",
        title: "Natural Cooling Sensation",
        description: "Naturally freshens breath with cooling menthol crystals and green cardamom.",
      },
      {
        icon: "🚫",
        title: "No Synthetic Sweeteners",
        description: "Zero saccharin, zero aspartame, and zero synthetic food dyes.",
      },
      {
        icon: "🌾",
        title: "Rich in Dietary Fiber",
        description: "Roasted seeds and carminative herbs that gently stimulate digestive enzymes.",
      },
    ],
    accordions: [
      {
        title: "The 4 Refreshing Blends in the Quartet",
        content: [
          "1. Shahi Gulab Saunf – Candied Lucknowi fennel seeds blended with real damask rose petals and a touch of aromatic cardamom.",
          "2. Banarasi Meetha Paan Bites – The rich, nostalgic flavor of traditional Banarasi betel leaf with gulkand, fennel, and delicate mint.",
          "3. Roasted Dhanadal & Sesame – Lightly toasted coriander seeds and nutty white sesame tossed with natural Himalayan pink rock salt.",
          "4. Minty Fennel Refresh – Crisp, tender green fennel infused with cooling botanical menthol crystals for long-lasting fresh breath.",
        ],
      },
      {
        title: "Ingredients & Nutritional Profile",
        content: [
          "Fennel Seeds, Roasted Coriander Seeds, Sesame Seeds, Dried Rose Petals, Betel Leaf Extracts, Gulkand, Menthol, Cardamom, Himalayan Rock Salt, Natural Plant Sugars.",
          "100% vegetarian. Packed in a facility that also processes almonds and nuts.",
        ],
      },
      {
        title: "Storage & Freshness Advice",
        content: [
          "Transfer into an airtight container or keep sealed in original zip pouches.",
          "Store in a dry, cool space away from steam and direct sunshine. Best consumed within 9 months of packaging.",
        ],
      },
      {
        title: "Shipping, Returns & Delivery",
        content: [
          "Dispatched in eco-friendly packaging within 24–48 hours.",
          "Pan-India shipping within 3–5 working days.",
          "Free shipping on orders above ₹499. Full replacement support for any damaged items.",
        ],
      },
    ],
    relatedProductSlugs: [
      "mukhwas-treats-pack-of-6",
      "the-meru-3-piece-stick-combo-pack",
    ],
    stockStatus: "In Stock",
    sku: "MERU-QRT-04",
  },
];

export function getProductBySlug(slug: string): ProductItem | undefined {
  const normalized = slug.toLowerCase().trim();
  return THE_MERU_PRODUCTS.find(
    (p) => p.slug === normalized || p.aliases.includes(normalized) || p.id === normalized
  );
}

export function getAllProductSlugs(): string[] {
  const slugs: string[] = [];
  THE_MERU_PRODUCTS.forEach((p) => {
    slugs.push(p.slug);
    p.aliases.forEach((a) => {
      if (!slugs.includes(a)) slugs.push(a);
    });
  });
  return slugs;
}
