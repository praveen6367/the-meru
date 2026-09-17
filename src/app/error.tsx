"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Section2 from "./sections/section2";
import HeaderSection from "./sections/header-section";
import FooterNewSection from "./sections/footer-new-section";
import { Button } from "../design-system/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Router caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full overflow-x-hidden">
      <Section2 />
      <HeaderSection />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center flex flex-col items-center justify-center">
        <span className="text-4xl sm:text-5xl mb-4">🌿</span>
        <span className="text-xs uppercase tracking-widest text-meru-gold font-bold mb-2">
          Temporary Interruption
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-deep-charcoal font-medium mb-4">
          Something Went Wrong
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-8 font-sans leading-relaxed">
          We encountered an unexpected issue loading this ritual offering. Please try refreshing or return home.
        </p>

        <div className="flex items-center gap-4">
          <Button variant="primary" size="md" onClick={() => reset()}>
            TRY AGAIN
          </Button>
          <Link href="/">
            <Button variant="ghost" size="md">
              HOME
            </Button>
          </Link>
        </div>
      </main>

      <FooterNewSection />
    </div>
  );
}
