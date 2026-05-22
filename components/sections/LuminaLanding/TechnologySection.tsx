import {
  BoltIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  MapPinIcon,
  SignalIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import type { LandingCopy } from "./shared";
import { Reveal, SectionTag, SectionTitle } from "./shared";

const techIcons = [SignalIcon, MapPinIcon, BoltIcon, CursorArrowRaysIcon, Squares2X2Icon, GlobeAltIcon];

export default function TechnologySection({ copy }: { copy: LandingCopy }) {
  return (
    <section id="benefits" className="content-auto-section relative overflow-hidden py-32">
      <div className="from-night-deep via-background to-night-deep absolute inset-0 bg-gradient-to-b" />
      <div className="bg-primary/10 absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" />
      <div className="relative mx-auto max-w-[1560px] px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>{copy.technology.tag}</SectionTag>
          <SectionTitle className="mt-6">{copy.technology.title}</SectionTitle>
          <p className="text-muted-foreground mt-6 text-xl">{copy.technology.text}</p>
        </Reveal>
        <Reveal className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3" delay={0.08}>
          {copy.technology.items.map((item, index) => {
            const IconComponent = techIcons[index];
            return (
              <div
                key={item}
                className="bg-card-glass glass-border rounded-2xl p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/15 flex h-12 w-12 items-center justify-center rounded-xl">
                    <IconComponent className="text-primary h-6 w-6" />
                  </div>
                  <p className="text-xl font-semibold">{item}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
