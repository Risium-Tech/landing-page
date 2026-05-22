"use client";

import dynamic from "next/dynamic";
import type { LandingCopy } from "./shared";
import { Reveal, SectionTag, SectionTitle } from "./shared";

const ScrollPhone3D = dynamic(() => import("./ScrollPhone3D"), {
  ssr: false,
  loading: () => <div className="mx-auto min-h-[520px] w-full max-w-[520px]" aria-hidden="true" />,
});

export default function ImmersiveSection({ copy }: { copy: LandingCopy }) {
  return (
    <section id="experiences" className="content-auto-section relative overflow-hidden py-32">
      <div className="from-night-deep via-background to-night-deep absolute inset-0 bg-gradient-to-b" />
      <div className="bg-primary/10 absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1560px] items-center gap-16 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]">
        <Reveal className="max-w-5xl">
          <SectionTag>{copy.immersive.tag}</SectionTag>
          <SectionTitle className="mt-6">{copy.immersive.title}</SectionTitle>
          <p className="text-muted-foreground mt-6 text-xl">{copy.immersive.text}</p>
          <div className="mt-8 space-y-4">
            <p className="text-foreground text-2xl">
              {copy.immersive.line1} <span className="text-primary">{copy.immersive.pixel}</span>.
            </p>
            <p className="text-foreground text-2xl">{copy.immersive.line2}</p>
          </div>
          <p className="text-muted-foreground mt-8 text-lg">{copy.immersive.detail}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ScrollPhone3D />
        </Reveal>
      </div>
    </section>
  );
}
