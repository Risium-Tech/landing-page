"use client";

import { useEffect, useMemo, useState } from "react";
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

const patternOptions: Array<{ id: MosaicPattern; title: string }> = [
  { id: "wave", title: "Onda" },
  { id: "pulse", title: "Pulso" },
  { id: "blink", title: "Piscar" },
  { id: "alternate", title: "Alternado" },
  { id: "rainbow", title: "Arco-íris" },
  { id: "chase", title: "Perseguição" },
  { id: "transition", title: "Transição" },
  { id: "strobe", title: "Estroboscópio" },
];

const featureDetails = {
  pt: [
    "Crie imagens, formas e movimentos usando os celulares do público como pontos de luz sincronizados.",
    "Dispare sequências de cores pela plateia com ritmo, direção e intensidade controlados em tempo real.",
    "Transforme arquibancadas e arenas em cenários vivos com efeitos que envolvem todos os participantes.",
    "Conduza momentos do evento com cenas visuais que acompanham música, anúncios e ativações especiais.",
    "Integre patrocinadores à experiência com mensagens, cores e efeitos visuais conectados à marca.",
  ],
  "pt-pt": [
    "Crie imagens, formas e movimentos usando os telemóveis do público como pontos de luz sincronizados.",
    "Dispare sequências de cores pela plateia com ritmo, direção e intensidade controlados em tempo real.",
    "Transforme bancadas e arenas em cenários vivos com efeitos que envolvem todos os participantes.",
    "Conduza momentos do evento com cenas visuais que acompanham música, anúncios e ativações especiais.",
    "Integre patrocinadores na experiência com mensagens, cores e efeitos visuais ligados à marca.",
  ],
  en: [
    "Create images, shapes and motion using audience phones as synchronized points of light.",
    "Launch color sequences across the crowd with rhythm, direction and intensity controlled in real time.",
    "Turn stands and arenas into living scenes with effects that involve every participant.",
    "Guide key event moments with visual scenes that follow music, announcements and special activations.",
    "Bring sponsors into the experience with brand messages, colors and connected visual effects.",
  ],
  es: [
    "Crea imágenes, formas y movimientos usando los móviles del público como puntos de luz sincronizados.",
    "Lanza secuencias de color por la audiencia con ritmo, dirección e intensidad controlados en tiempo real.",
    "Transforma gradas y arenas en escenarios vivos con efectos que involucran a todos los participantes.",
    "Conduce momentos del evento con escenas visuales que acompañan música, anuncios y activaciones especiales.",
    "Integra patrocinadores en la experiencia con mensajes, colores y efectos visuales conectados a la marca.",
  ],
};

function getFeatureDetails(copy: LandingCopy) {
  if (copy.nav.download === "Download app") return featureDetails.en;
  if (copy.nav.download === "Descargar app") return featureDetails.es;
  if (copy.nav.download === "Descarregar app") return featureDetails["pt-pt"];

  return featureDetails.pt;
}

export default function MosaicsSection({ copy }: { copy: LandingCopy }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<MosaicPattern>("wave");
  const details = useMemo(() => getFeatureDetails(copy), [copy]);
  const expandedIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    if (hoveredIndex !== null) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % copy.mosaics.features.length);
    }, 3600);

    return () => window.clearInterval(intervalId);
  }, [copy.mosaics.features.length, hoveredIndex]);

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
          <div className="space-y-3 lg:col-span-2">
            {copy.mosaics.features.map((feature, index) => (
              <Reveal
                key={feature}
                className={`bg-card-glass glass-border rounded-xl transition-all ${
                  expandedIndex === index ? "border-primary/40 shadow-soft-glow" : "hover:border-primary/40"
                }`}
                delay={index * 0.05}
              >
                <button
                  type="button"
                  aria-expanded={expandedIndex === index}
                  className="flex w-full items-start gap-4 px-5 py-4 text-left"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => {
                    setActiveIndex(index);
                    setHoveredIndex(null);
                  }}
                >
                  <span
                    className={`shadow-soft-glow mt-2 h-2.5 w-2.5 shrink-0 rounded-full transition-colors ${
                      expandedIndex === index ? "bg-sun" : "bg-primary"
                    }`}
                  />
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold">{feature}</span>
                    <span
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
                        expandedIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="min-h-0">
                        <span className="text-muted-foreground mt-3 block text-base leading-relaxed">
                          {details[index]}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal className="relative lg:col-span-3" delay={0.12}>
            <div className="bg-card-glass glass-border shadow-glow rounded-3xl p-4">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground mr-1 text-xs font-semibold tracking-[0.18em] uppercase">
                  Padrão
                </span>
                {patternOptions.map((pattern) => {
                  const isSelected = selectedPattern === pattern.id;

                  return (
                    <button
                      key={pattern.id}
                      type="button"
                      aria-pressed={isSelected}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-foreground/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      {pattern.title}
                    </button>
                  );
                })}
              </div>
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
