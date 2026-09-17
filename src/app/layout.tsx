import "./globals.css";
import "./ditto.css";
import type { ReactNode } from "react";
import { SITE_ORIGIN } from "../lib/site";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  "metadataBase": new URL(SITE_ORIGIN || "http://localhost:3000"),
  "title": "THE MERU | Contemporary Indian Spiritual & Lifestyle Rituals",
  "description": "The Meru is an Indian premium spiritual and lifestyle brand built around transformation, craftsmanship, sacred ritual, sustainability and beautifully reimagined products.",
  "alternates": {
    "canonical": "/"
  },
  "openGraph": {
    "title": "THE MERU | Contemporary Indian Spiritual & Lifestyle Rituals",
    "description": "The Meru is an Indian premium spiritual and lifestyle brand built around transformation, craftsmanship, sacred ritual, sustainability and beautifully reimagined products.",
    "type": "website",
    "siteName": "THE MERU",
    "url": "/"
  },
  "twitter": {
    "card": "summary",
    "title": "THE MERU | Contemporary Indian Spiritual & Lifestyle Rituals",
    "description": "The Meru is an Indian premium spiritual and lifestyle brand built around transformation, craftsmanship, sacred ritual, sustainability and beautifully reimagined products."
  },
  "icons": {
    "icon": [
      {
        "url": "/assets/cloned/Logo.jpeg",
        "type": "image/jpeg"
      }
    ]
  }
};
export const viewport = {
  "width": "device-width",
  "initialScale": 1,
  "themeColor": "#F8F5EE"
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          key="ditto-json-ld-0"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ["{\n        \"@context\": \"https://schema.org\",\n        \"@type\": \"Organization\",\n        \"@id\": \"", "/#organization\",\n        \"name\": \"The Meru\",\n        \"alternateName\": \"TheMeru.co\",\n        \"url\": \"", "/\",\n        \"logo\": \"", "/assets/cloned/Logo.jpeg\",\n        \"description\": \"The Meru is a luxury lifestyle and spiritual ritual brand handcrafted from sacred offerings.\",\n        \"foundingDate\": \"2026\",\n        \"address\": {\n          \"@type\": \"PostalAddress\",\n          \"streetAddress\": \"Kalyanpur\",\n          \"addressLocality\": \"Kanpur\",\n          \"addressRegion\": \"Uttar Pradesh\",\n          \"postalCode\": \"209305\",\n          \"addressCountry\": \"IN\"\n        }\n      }"].join(SITE_ORIGIN) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof window !== 'undefined') {
                  var clean = function() {
                    document.documentElement.removeAttribute('data-scribe-recorder-ready');
                    if (document.body) {
                      document.body.removeAttribute('data-new-gr-c-s-check-loaded');
                      document.body.removeAttribute('data-gr-ext-installed');
                    }
                    var els = document.querySelectorAll('[fdprocessedid]');
                    for (var i = 0; i < els.length; i++) {
                      els[i].removeAttribute('fdprocessedid');
                    }
                  };
                  clean();
                  var observer = new MutationObserver(clean);
                  observer.observe(document.documentElement, {
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['fdprocessedid', 'data-scribe-recorder-ready', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed']
                  });
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="w-full min-h-screen text-foreground [font-family:GothamRounded-Light] text-base font-normal bg-background antialiased" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
