"use client";

import { useState } from "react";
import type { LandingCopy } from "./shared";
import { PhoneGrid, Reveal, SectionTag, SectionTitle } from "./shared";

type MosaicPattern =
  | "wave"
  | "pulse"
  | "blink"
  | "alternate"
  | "rainbow"
  | "chase"
  | "transition"
  | "strobe";

const patternOptions: Array<{ id: MosaicPattern; title: string; description: string }> = [
  {
    id: "wave",
    title: "Onda",
    description: "Cores se movem em sequência entre setores da plateia.",
  },
  {
    id: "pulse",
    title: "Pulso",
    description: "A luz expande do centro para fora em anéis sincronizados.",
  },
  {
    id: "blink",
    title: "Piscar",
    description: "Todos ligam e desligam alternadamente, criando impacto visual.",
  },
  {
    id: "alternate",
    title: "Alternado",
    description: "Duas cores alternam entre setores pares e ímpares.",
  },
  {
    id: "rainbow",
    title: "Arco-íris",
    description: "Um gradiente de cores percorre toda a composição.",
  },
  {
    id: "chase",
    title: "Perseguição",
    description: "Um ponto de luz corre pela grade e guia o olhar.",
  },
  {
    id: "transition",
    title: "Transição",
    description: "As cores se misturam gradualmente de uma cena para outra.",
  },
  {
    id: "strobe",
    title: "Estroboscópio",
    description: "Flashes rápidos criam um efeito branco intenso e ritmado.",
  },
];

export default function MosaicsSection({ copy }: { copy: LandingCopy }) {
  const [selectedPattern, setSelectedPattern] = useState<MosaicPattern>("wave");

  return (
    <section id="mosaics" className="content-auto-section relative overflow-hidden py-32">
      <div className="via-primary/40 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="relative mx-auto max-w-[1560px] px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>{copy.mosaics.tag}</SectionTag>
          <SectionTitle className="mt-6">{copy.mosaics.title}</SectionTitle>
          <p className="text-muted-foreground mt-6 text-xl">{copy.mosaics.text}</p>
        </Reveal>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
            {patternOptions.map((pattern, index) => {
              const isSelected = selectedPattern === pattern.id;

              return (
                <Reveal
                  key={pattern.id}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/15 shadow-soft-glow"
                      : "border-foreground/10 bg-card hover:border-primary/60 hover:bg-card/80"
                  }`}
                  delay={index * 0.04}
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    className="block w-full text-left"
                    onClick={() => setSelectedPattern(pattern.id)}
                  >
                    <span className="block text-base font-bold text-foreground">{pattern.title}</span>
                    <span className="text-muted-foreground mt-2 block line-clamp-2 text-sm leading-relaxed">
                      {pattern.description}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="relative lg:col-span-3" delay={0.12}>
            <div className="bg-card-glass glass-border shadow-glow rounded-3xl p-4">
              <PhoneGrid rows={5} cols={16} effect="wave" pattern={selectedPattern} />
            </div>
            <div className="bg-glow absolute -inset-6 -z-10 rounded-full opacity-20 blur-3xl" />
          </Reveal>
        </div>

        <Reveal className="text-gradient mt-20 text-center text-4xl font-bold md:text-5xl">
          {copy.mosaics.closing1} <br />
          <span className="text-primary">{copy.mosaics.closing2}</span>
        </Reveal>
      </div>
    </section>
  );
}
