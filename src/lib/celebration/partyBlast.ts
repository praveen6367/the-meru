/**
 * Full-Site Party Blast Celebration Engine for THE MERU
 *
 * Premium, multi-stage celebration particle effect utilizing canvas-confetti
 * and a lightweight CSS sparkle overlay.
 *
 * Characteristics:
 * - 100% non-blocking (pointer-events: none)
 * - Multi-stage bursts: dual side cannons, central blast, staggered micro-bursts
 * - Quiet luxury curated color palette matching The Meru identity
 * - Responsive: scales down particle count on mobile
 * - Respects prefers-reduced-motion
 * - Built-in cooldown prevents duplicate spamming
 * - Dynamic import of canvas-confetti for zero initial bundle overhead
 * - Clean self-removal of all temporary DOM elements and timers
 */

export interface PartyBlastOptions {
  intensity?: "low" | "medium" | "high";
  duration?: number;
  colors?: string[];
  sparkles?: boolean;
}

// Curated Sacred & Festive Palette for The Meru
export const THE_MERU_CELEBRATION_PALETTE = [
  "#C99A28", // Meru Gold
  "#E0B94A", // Meru Gold Light
  "#9D5B3D", // Terracotta
  "#465542", // Botanical Green
  "#E9DDC9", // Warm Sand
  "#FFF8EE", // Sacred Ivory Pearl
  "#FFD700", // Vibrant Festive Gold
  "#D4AF37", // Metallic Champagne
];

let isBlasting = false;
let blastCooldownTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Creates temporary floating CSS sparkle elements across the viewport
 */
function spawnSparkleAccents(count: number = 18, duration: number = 2800) {
  if (typeof document === "undefined") return;

  const container = document.createElement("div");
  container.className = "meru-sparkle-overlay";
  container.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 99999;
    overflow: hidden;
  `;

  const sparkleChars = ["✦", "✧", "⋆", "•", "✨"];
  const colors = ["#C99A28", "#E0B94A", "#FFD700", "#FAF8F5", "#D4AF37"];

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement("span");
    const char = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 94 + 3; // 3% to 97%
    const y = Math.random() * 85 + 5; // 5% to 90%
    const size = Math.floor(Math.random() * 16 + 14); // 14px to 30px
    const delay = Math.random() * 450; // stagger entrance
    const animDuration = Math.random() * 1000 + 1400; // 1.4s to 2.4s

    sparkle.innerText = char;
    sparkle.style.cssText = `
      position: absolute;
      left: ${x}vw;
      top: ${y}vh;
      font-size: ${size}px;
      color: ${color};
      text-shadow: 0 0 10px rgba(224, 185, 74, 0.7);
      opacity: 0;
      transform: scale(0.2) rotate(${Math.random() * 60 - 30}deg);
      animation: meruSparkleAnim ${animDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms forwards;
      pointer-events: none;
      user-select: none;
    `;

    container.appendChild(sparkle);
  }

  document.body.appendChild(container);

  setTimeout(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }, duration + 600);
}

/**
 * Triggers the full-site Party Blast Celebration Effect
 */
export async function triggerPartyBlast(options: PartyBlastOptions = {}): Promise<void> {
  if (typeof window === "undefined") return;

  // 1. Accessibility: respect reduced motion preferences
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    return;
  }

  // 2. Prevent duplicate blasts running simultaneously
  if (isBlasting) {
    return;
  }

  isBlasting = true;

  const {
    intensity = "high",
    colors = THE_MERU_CELEBRATION_PALETTE,
    sparkles = true,
  } = options;

  // Calculate intensity multipliers
  const intensityMap: Record<"low" | "medium" | "high", number> = {
    low: 0.6,
    medium: 1.0,
    high: 1.4,
  };

  const baseMultiplier = intensityMap[intensity] || 1.0;
  const isMobile = window.innerWidth < 640;
  const multiplier = isMobile ? baseMultiplier * 0.65 : baseMultiplier;

  // Reset cooldown after 3.2 seconds
  if (blastCooldownTimer) clearTimeout(blastCooldownTimer);
  blastCooldownTimer = setTimeout(() => {
    isBlasting = false;
  }, 3200);

  try {
    // 3. Dynamically import canvas-confetti
    const confettiModule = await import("canvas-confetti");
    const confetti = (confettiModule.default || confettiModule) as unknown as (
      options?: import("canvas-confetti").Options
    ) => Promise<null> | null;

    // Optional lightweight CSS sparkle overlay
    if (sparkles) {
      spawnSparkleAccents(Math.round(20 * multiplier));
    }

    // --- STAGE 1: Dual Lower Cannons (Immediate, 0ms) ---
    // Left Cannon
    confetti({
      particleCount: Math.round(75 * multiplier),
      angle: 60,
      spread: 65,
      origin: { x: isMobile ? 0.05 : 0.1, y: 0.8 },
      colors,
      startVelocity: isMobile ? 42 : 55,
      gravity: 0.95,
      scalar: isMobile ? 0.85 : 1.05,
      ticks: 240,
      zIndex: 99999,
      disableForReducedMotion: true,
    });

    // Right Cannon
    confetti({
      particleCount: Math.round(75 * multiplier),
      angle: 120,
      spread: 65,
      origin: { x: isMobile ? 0.95 : 0.9, y: 0.8 },
      colors,
      startVelocity: isMobile ? 42 : 55,
      gravity: 0.95,
      scalar: isMobile ? 0.85 : 1.05,
      ticks: 240,
      zIndex: 99999,
      disableForReducedMotion: true,
    });

    // --- STAGE 2: Core Central Burst (+180ms) ---
    setTimeout(() => {
      confetti({
        particleCount: Math.round(90 * multiplier),
        spread: 105,
        origin: { x: 0.5, y: isMobile ? 0.5 : 0.55 },
        colors,
        startVelocity: isMobile ? 36 : 48,
        gravity: 0.88,
        scalar: isMobile ? 0.9 : 1.15,
        ticks: 280,
        shapes: ["circle", "square"],
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 180);

    // --- STAGE 3: Staggered Secondary Celebration Bursts (+380ms) ---
    setTimeout(() => {
      // Left-center floating bloom
      confetti({
        particleCount: Math.round(45 * multiplier),
        angle: 75,
        spread: 55,
        origin: { x: 0.32, y: 0.65 },
        colors,
        startVelocity: isMobile ? 28 : 38,
        gravity: 0.92,
        scalar: 0.95,
        ticks: 220,
        zIndex: 99999,
        disableForReducedMotion: true,
      });

      // Right-center floating bloom
      confetti({
        particleCount: Math.round(45 * multiplier),
        angle: 105,
        spread: 55,
        origin: { x: 0.68, y: 0.65 },
        colors,
        startVelocity: isMobile ? 28 : 38,
        gravity: 0.92,
        scalar: 0.95,
        ticks: 220,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 380);

    // --- STAGE 4: Gentle High-Altitude Gold Shimmer (+600ms) ---
    setTimeout(() => {
      confetti({
        particleCount: Math.round(40 * multiplier),
        spread: 120,
        origin: { x: 0.5, y: 0.35 },
        colors: ["#C99A28", "#E0B94A", "#FFD700", "#FFFFFF"],
        startVelocity: isMobile ? 20 : 26,
        gravity: 0.8,
        decay: 0.93,
        scalar: isMobile ? 0.8 : 1.0,
        ticks: 200,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 600);
  } catch (error) {
    console.error("[The Meru Party Blast] Celebration failed to render:", error);
    isBlasting = false;
  }
}

/**
 * Event-driven trigger helper: dispatches or listens to custom DOM event
 */
export function dispatchGlobalPartyBlast(options?: PartyBlastOptions) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("meru:party-blast", {
      detail: options,
    })
  );
}
