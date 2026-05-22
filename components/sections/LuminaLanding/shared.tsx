"use client";

import Image from "next/image";
import * as m from "framer-motion/m";
import { LazyMotion, useReducedMotion } from "framer-motion";
import type { ComponentType, CSSProperties, ReactNode, SVGProps } from "react";
import type { LandingCopy } from "@/utils/landingCopy";
import { APPLE_STORE_URL, PLAY_STORE_URL } from "@/utils/storeLinks";

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;
export type { LandingCopy };

const revealTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] } as const;
const loadDomAnimation = () => import("framer-motion").then((module) => module.domAnimation);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadDomAnimation}>{children}</LazyMotion>;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <div className="group inline-grid grid-cols-[auto_1fr] items-center gap-3">
      <span className="relative flex h-9 w-3 items-center justify-center">
        <span className="bg-glow shadow-soft-glow h-full w-px rounded-full" />
        <span className="bg-sun absolute top-1 h-1.5 w-1.5 rounded-full shadow-[0_0_16px_oklch(0.87_0.17_92_/_0.65)]" />
        <span className="bg-primary absolute bottom-1 h-1.5 w-1.5 rounded-full shadow-[0_0_16px_oklch(0.74_0.17_148_/_0.65)]" />
      </span>
      <span className="relative overflow-hidden border-l border-primary/30 py-1.5 pr-4 pl-3 text-xs font-semibold tracking-[0.26em] text-primary uppercase">
        <span className="absolute inset-y-0 left-0 w-px bg-primary/80" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-primary/70 via-sun/60 to-transparent" />
        {children}
      </span>
    </div>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-gradient text-4xl leading-[1.05] font-bold md:text-6xl lg:text-7xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function PhoneGrid({
  rows = 8,
  cols = 14,
  effect = "pulse",
  pattern = "wave",
}: {
  rows?: number;
  cols?: number;
  effect?: "pulse" | "wave";
  pattern?: "wave" | "pulse" | "blink" | "alternate" | "rainbow" | "chase" | "transition" | "strobe";
}) {
  const cells = Array.from({ length: rows * cols });
  const tones = [
    "bg-primary shadow-[0_0_18px_oklch(0.74_0.17_148_/_0.45)]",
    "bg-sun shadow-[0_0_18px_oklch(0.87_0.17_92_/_0.45)]",
    "bg-cyan-300 shadow-[0_0_18px_rgb(103_232_249_/_0.38)]",
    "bg-sky-400 shadow-[0_0_18px_rgb(56_189_248_/_0.34)]",
    "bg-fuchsia-400 shadow-[0_0_18px_rgb(232_121_249_/_0.34)]",
    "bg-rose-400 shadow-[0_0_18px_rgb(251_113_133_/_0.34)]",
    "bg-violet-400 shadow-[0_0_18px_rgb(167_139_250_/_0.34)]",
    "bg-emerald-300 shadow-[0_0_18px_rgb(110_231_183_/_0.38)]",
    "bg-amber-300 shadow-[0_0_18px_rgb(252_211_77_/_0.38)]",
    "bg-foreground/12",
  ];

  return (
    <div
      className="pointer-events-none grid gap-2 select-none"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cells.map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const centerCol = (cols - 1) / 2;
        const centerRow = (rows - 1) / 2;
        const distance = Math.abs(col - centerCol) + Math.abs(row - centerRow);
        const delay = effect === "wave" ? col * 0.08 + row * 0.18 : col * 0.07 + row * 0.04;
        const tone = tones[(i * 7 + Math.floor(i / cols) * 5) % tones.length];

        if (effect === "wave") {
          return (
            <div
              key={i}
              className={`phone-shape phone-pattern phone-pattern-${pattern} aspect-[9/19]`}
              style={
                {
                  "--phone-col": col,
                  "--phone-row": row,
                  "--phone-index": i,
                  "--phone-distance": distance,
                  "--phone-parity": i % 2,
                  "--phone-third": i % 3,
                  animationDelay: `${delay}s`,
                } as CSSProperties
              }
            />
          );
        }

        return (
          <div
            key={i}
            className={`phone-shape aspect-[9/19] ${tone} animate-grid-pulse`}
            style={{ animationDelay: `${delay}s` }}
          />
        );
      })}
    </div>
  );
}

export function FloatingPhones({ count = 7, className = "" }: { count?: number; className?: string }) {
  const basePhones = [
    { left: 8, top: 20, size: 32, delay: 0, tone: 0 },
    { left: 85, top: 30, size: 28, delay: 1.5, tone: 1 },
    { left: 15, top: 70, size: 24, delay: 2.5, tone: 2 },
    { left: 78, top: 75, size: 36, delay: 0.8, tone: 3 },
    { left: 50, top: 12, size: 20, delay: 3, tone: 4 },
    { left: 92, top: 55, size: 22, delay: 2, tone: 5 },
    { left: 4, top: 45, size: 26, delay: 1, tone: 6 },
  ];
  const floatingTones = [
    "bg-primary/35 border-primary/50 shadow-[0_0_22px_oklch(0.74_0.17_148_/_0.34)]",
    "bg-sun/35 border-sun/50 shadow-[0_0_22px_oklch(0.87_0.17_92_/_0.34)]",
    "bg-cyan-300/35 border-cyan-200/50 shadow-[0_0_22px_rgb(103_232_249_/_0.28)]",
    "bg-sky-400/35 border-sky-300/50 shadow-[0_0_22px_rgb(56_189_248_/_0.26)]",
    "bg-fuchsia-400/35 border-fuchsia-300/50 shadow-[0_0_22px_rgb(232_121_249_/_0.26)]",
    "bg-rose-400/35 border-rose-300/50 shadow-[0_0_22px_rgb(251_113_133_/_0.26)]",
    "bg-violet-400/35 border-violet-300/50 shadow-[0_0_22px_rgb(167_139_250_/_0.26)]",
    "bg-emerald-300/35 border-emerald-200/50 shadow-[0_0_22px_rgb(110_231_183_/_0.28)]",
  ];

  const phones = Array.from({ length: count }, (_, index) => {
    const base = basePhones[index % basePhones.length];
    const rowOffset = Math.floor(index / basePhones.length);

    return {
      ...base,
      left: (base.left + rowOffset * 17 + index * 3) % 96,
      top: (base.top + rowOffset * 23 + index * 5) % 88,
      size: Math.max(16, base.size - (rowOffset % 3) * 3),
      delay: base.delay + rowOffset * 0.35,
    };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {phones.map((phone, index) => (
        <div
          key={index}
          className="animate-float absolute"
          style={{
            left: `${phone.left}%`,
            top: `${phone.top}%`,
            animationDelay: `${phone.delay}s`,
          }}
        >
          <div
            className={`phone-shape border ${floatingTones[(phone.tone + index) % floatingTones.length]}`}
            style={{ width: phone.size, height: phone.size * (19 / 9) }}
          />
        </div>
      ))}
    </div>
  );
}

export function IconCard({
  icon: IconComponent,
  label,
  wide = false,
}: {
  icon: Icon;
  label: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`bg-card-glass glass-border hover:shadow-soft-glow rounded-2xl p-6 transition-all ${wide ? "sm:col-span-2" : ""}`}
    >
      <div className="bg-primary/15 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
        <IconComponent className="text-primary h-6 w-6" />
      </div>
      <p className="text-lg font-semibold">{label}</p>
    </div>
  );
}

export function StoreButtons({ copy }: { copy: LandingCopy }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.download.googlePlayLabel}
      >
        <Image
          src="/images/googleplay-icon.png"
          alt={copy.download.googlePlayAlt}
          width={180}
          height={54}
        />
      </a>
      <a
        href={APPLE_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.download.appStoreLabel}
      >
        <Image
          src="/images/appstore-icon.png"
          alt={copy.download.appStoreAlt}
          width={180}
          height={54}
        />
      </a>
    </div>
  );
}
