"use client";

import { useEffect } from "react";
import { triggerPartyBlast, type PartyBlastOptions } from "../../lib/celebration/partyBlast";

declare global {
  interface Window {
    triggerPartyBlast?: (options?: PartyBlastOptions) => Promise<void>;
  }
}

/**
 * Global Party Blast Listener mounted at root layout.
 * Listens for 'meru:party-blast' custom events and binds window.triggerPartyBlast
 * for direct accessibility across the whole application.
 */
export default function PartyBlastListener() {
  useEffect(() => {
    // Expose global helper on window for easy developer & programmatic access
    window.triggerPartyBlast = triggerPartyBlast;

    const handleCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent<PartyBlastOptions>;
      triggerPartyBlast(customEvent.detail || {});
    };

    window.addEventListener("meru:party-blast", handleCustomEvent);
    return () => {
      window.removeEventListener("meru:party-blast", handleCustomEvent);
      delete window.triggerPartyBlast;
    };
  }, []);

  return null;
}
