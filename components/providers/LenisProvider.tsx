"use client";

import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");

    if (reducedMotion.matches || !desktop.matches) {
      return;
    }

    let frameId = 0;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let disposed = false;

    function raf(time: number) {
      lenis?.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    import("lenis").then(({ default: Lenis }) => {
      if (disposed) {
        return;
      }

      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      frameId = requestAnimationFrame(raf);
      (window as any).lenis = lenis;
    });

    const handleVisibilityChange = () => {
      cancelAnimationFrame(frameId);

      if (!document.hidden) {
        frameId = requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(frameId);
      lenis?.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
