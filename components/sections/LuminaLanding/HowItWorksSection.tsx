import {
  DevicePhoneMobileIcon,
  MapPinIcon,
  SignalIcon,
  SparklesIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import type { LandingCopy } from "./shared";
import { Reveal, SectionTag, SectionTitle } from "./shared";

const highlightIcons = [SignalIcon, Squares2X2Icon, MapPinIcon, UsersIcon];
const stepIcons = [MapPinIcon, DevicePhoneMobileIcon, SparklesIcon];

export default function HowItWorksSection({ copy }: { copy: LandingCopy }) {
  return (
    <section id="technology" className="content-auto-section relative py-32">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1560px] px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>{copy.how.tag}</SectionTag>
          <SectionTitle className="mt-6">{copy.how.title}</SectionTitle>
        </Reveal>
        <Reveal className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4" delay={0.04}>
          {copy.highlights.map((label, index) => {
            const IconComponent = highlightIcons[index];
            return (
              <div
                key={label}
                className="bg-card-glass glass-border hover:shadow-soft-glow flex flex-col items-center gap-2 rounded-2xl p-5 text-center transition-all"
              >
                <div className="bg-primary/15 flex h-10 w-10 items-center justify-center rounded-xl">
                  <IconComponent className="text-primary h-5 w-5" />
                </div>
                <span className="text-foreground/90 text-base">{label}</span>
              </div>
            );
          })}
        </Reveal>
        <Reveal className="relative mt-16 grid gap-6 md:grid-cols-3" delay={0.08}>
          {copy.how.steps.map((step, index) => {
            const IconComponent = stepIcons[index];
            return (
              <div
                key={step.title}
                className="step-flow-card bg-card-glass group hover:shadow-soft-glow relative rounded-3xl p-8 transition-all will-change-transform"
                style={{ animationDelay: `${index * 1.4}s` }}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="bg-glow shadow-soft-glow flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                    <IconComponent className="text-primary-foreground h-7 w-7" />
                  </div>
                  <span className="text-primary/20 text-5xl font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-foreground mb-3 text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
