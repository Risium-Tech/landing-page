import {
  BoltIcon,
  CursorArrowRaysIcon,
  EyeIcon,
  LightBulbIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import type { LandingCopy } from "./shared";
import { Reveal, SectionTag, SectionTitle } from "./shared";

const sponsorIcons = [MegaphoneIcon, LightBulbIcon, CursorArrowRaysIcon, EyeIcon, BoltIcon];

export default function SponsorsSection({ copy }: { copy: LandingCopy }) {
  return (
    <section id="sponsors" className="content-auto-section relative py-32">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1560px] px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>{copy.sponsors.tag}</SectionTag>
          <SectionTitle className="mt-6">{copy.sponsors.title}</SectionTitle>
          <p className="text-muted-foreground mt-6 text-xl">{copy.sponsors.text}</p>
        </Reveal>
        <Reveal className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" delay={0.08}>
          {copy.sponsors.items.map((item, index) => {
            const IconComponent = sponsorIcons[index];
            return (
              <div
                key={item}
                className="bg-card-glass glass-border hover:shadow-soft-glow rounded-2xl p-6 text-center transition-all hover:-translate-y-1 will-change-transform"
              >
                <div className="bg-glow shadow-soft-glow mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <IconComponent className="text-primary-foreground h-5 w-5" />
                </div>
                <p className="text-base font-semibold">{item}</p>
              </div>
            );
          })}
        </Reveal>
        <Reveal className="text-gradient mt-16 text-center text-4xl font-bold md:text-5xl">
          {copy.sponsors.closing1} <span className="text-primary">{copy.sponsors.closing2}</span>
        </Reveal>
      </div>
    </section>
  );
}
