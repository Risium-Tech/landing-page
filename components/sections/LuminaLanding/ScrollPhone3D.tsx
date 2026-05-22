"use client";

import * as m from "framer-motion/m";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ScrollPhone3D() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: phoneRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [70, -10, -80]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 8, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-28, -12, 18]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-8, 7]);

  return (
    <div
      ref={phoneRef}
      aria-hidden="true"
      className="relative mx-auto flex min-h-[520px] w-full max-w-[520px] items-center justify-center overflow-visible"
      style={{ perspective: "1200px" }}
    >
      <div className="bg-primary/20 absolute h-[68%] w-[68%] rounded-full blur-[90px]" />
      <div className="bg-sun/10 absolute right-10 bottom-10 h-48 w-48 rounded-full blur-[70px]" />

      <m.div
        className="relative h-[430px] w-[206px]"
        animate={reduceMotion ? undefined : { translateY: [0, -12, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <m.div
          className="absolute inset-0"
          style={{
            y: reduceMotion ? 0 : y,
            rotateX: reduceMotion ? 0 : rotateX,
            rotateY: reduceMotion ? 0 : rotateY,
            rotateZ: reduceMotion ? 0 : rotateZ,
            transformStyle: "preserve-3d",
          }}
        >
        <div
          className="absolute inset-y-2 -right-2 z-10 w-8 rounded-r-[2.1rem] bg-[linear-gradient(180deg,oklch(0.34_0.06_252),oklch(0.12_0.04_255)_44%,oklch(0.05_0.03_255))] shadow-[inset_-2px_0_8px_oklch(0.97_0.01_240_/_0.12)]"
          style={{
            transform: "translateZ(-10px)",
          }}
        />
        <div className="absolute top-24 -right-3 z-30 h-14 w-1.5 rounded-full bg-foreground/18" />

        <div className="glass-border absolute inset-0 z-20 overflow-hidden rounded-[2.35rem] bg-[linear-gradient(145deg,oklch(0.22_0.05_252),oklch(0.09_0.04_255))] p-3 shadow-[0_34px_80px_oklch(0.04_0.03_255_/_0.62),0_18px_44px_-24px_oklch(0.74_0.17_148_/_0.55)]">
          <div className="absolute inset-px rounded-[2.25rem] border border-foreground/10" />
          <div className="absolute inset-0 rounded-[2.35rem] bg-[linear-gradient(120deg,oklch(0.97_0.01_240_/_0.18),transparent_24%,transparent_72%,oklch(0.97_0.01_240_/_0.08))]" />
          <div className="relative h-full overflow-hidden rounded-[1.85rem] bg-night-deep">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute top-4 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-night-deep/85" />
            <div className="absolute inset-x-0 top-24 flex items-center justify-center">
              <Image
                src="/svg/logo.svg"
                alt=""
                width={118}
                height={145}
                className="h-24 w-auto object-contain drop-shadow-[0_0_22px_oklch(0.74_0.17_148_/_0.58)]"
              />
            </div>
            <div className="absolute right-12 bottom-8 left-12 h-1.5 rounded-full bg-foreground/45" />
          </div>
        </div>
        </m.div>
      </m.div>
    </div>
  );
}
