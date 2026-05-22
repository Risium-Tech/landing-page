"use client";

import Image from "next/image";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import { FloatingPhones, Reveal } from "./shared";
import type { LandingCopy } from "./shared";

export default function HeroSection({ copy }: { copy: LandingCopy }) {
  return (
    <section
      id="home"
      className="bg-night-deep relative flex w-full flex-col justify-end overflow-hidden pt-60"
    >
      <Image
        src="/images/background.webp"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center opacity-80"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,oklch(0.74_0.17_148_/_0.12),transparent_60%),linear-gradient(180deg,oklch(0.11_0.05_255_/_0.66)_0%,oklch(0.16_0.06_252_/_0.76)_100%)]" />
      <div className="grid-pattern absolute inset-0 z-20 opacity-40" />
      <FloatingPhones className="z-20" />

      <div className="relative z-30 mx-auto flex w-full flex-wrap justify-around gap-8 px-4 md:flex-row md:items-end md:px-6 md:pt-0">
        <Reveal className="max-w-3xl pb-12 text-center md:pb-20 md:text-left">
          <h1 className="text-gradient mt-6 text-3xl leading-[1.05] font-bold md:text-4xl lg:text-5xl xl:text-7xl">
            {copy.hero.title}
          </h1>
          <p className="text-foreground/90 mt-6 text-lg font-medium md:text-2xl">
            {copy.hero.subtitle}
          </p>
          <p className="text-muted-foreground mt-5 text-lg">{copy.hero.text}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#experiences"
              className="bg-glow text-primary-foreground shadow-glow inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition-all hover:scale-[1.03]"
            >
              {copy.hero.primaryCta}
              <ArrowRightIcon className="h-5 w-5" />
            </a>
            <a
              href="#download"
              className="bg-card-glass glass-border text-foreground hover:bg-primary/10 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition-all"
            >
              <PlayIcon className="text-primary h-5 w-5" />
              {copy.hero.secondaryCta}
            </a>
          </div>
        </Reveal>

        <Reveal className="relative hidden items-end justify-center md:flex" delay={0.12}>
          <div className="bg-primary/20 absolute inset-x-8 bottom-0 h-24 rounded-full blur-3xl" />
          <Image
            src="/images/banner-girl.png"
            alt={copy.hero.imageAlt}
            width={900}
            height={720}
            className="relative h-auto w-[600px] object-contain object-bottom md:w-[600px] lg:w-[800px]"
            priority
          />
        </Reveal>
      </div>
    </section>
  );
}
