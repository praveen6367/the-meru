"use client";

import { useState } from "react";
import { Button } from "../../design-system/components/Button";

/** Newsletter Signup CTA Section. */
export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full py-16 bg-surface-3 border-b border-black/5" id="shopify-section-1527511285978">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="font-sans text-xs uppercase tracking-widest text-meru-gold font-semibold mb-2 block">
          STAY CONNECTED
        </span>
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold text-deep-charcoal tracking-tight mb-3" id="newl">
          Sign up for exclusive rituals, new launches & sacred offerings
        </h2>
        <p className="font-sans text-sm sm:text-base text-earth mb-8 max-w-xl mx-auto leading-relaxed">
          Join The Meru inner circle to receive ritual guides, stories of sacred craftsmanship & early access to limited editions.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 py-3 px-6 rounded-[6px] bg-botanical/15 text-botanical border border-botanical/30 font-sans font-medium text-sm">
            <span>✓ Thank you for subscribing to The Meru rituals & offerings!</span>
          </div>
        ) : (
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            id="contact_form"
            onSubmit={handleSubmit}
            suppressHydrationWarning
          >
            <input
              className="w-full sm:flex-1 h-11 border border-deep-charcoal/20 rounded-[6px] px-4 text-sm text-deep-charcoal bg-sacred-ivory placeholder:text-muted-foreground/60 focus:outline-hidden focus:border-meru-gold focus:ring-2 focus:ring-meru-gold/20 transition-colors"
              id="signup_section"
              name="contact[email]"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              suppressHydrationWarning
            />
            <Button
              variant="primary"
              size="md"
              type="submit"
              withArrow
              className="w-full sm:w-auto shrink-0"
              suppressHydrationWarning
            >
              SUBSCRIBE
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
