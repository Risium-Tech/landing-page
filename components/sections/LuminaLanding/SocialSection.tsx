import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ShareIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import type { LandingCopy } from "./shared";
import { IconCard, Reveal, SectionTag, SectionTitle } from "./shared";

const socialIcons = [HeartIcon, ShareIcon, UsersIcon, SparklesIcon, ChatBubbleOvalLeftIcon];

export default function SocialSection({ copy }: { copy: LandingCopy }) {
  return (
    <section id="solutions" className="content-auto-section relative overflow-hidden py-32">
      <div className="from-background via-night to-background absolute inset-0 bg-gradient-to-b" />
      <div className="relative mx-auto grid max-w-[1560px] items-center gap-16 px-4 md:px-6 lg:grid-cols-2">
        <Reveal>
          <SectionTag>{copy.social.tag}</SectionTag>
          <SectionTitle className="mt-6">{copy.social.title}</SectionTitle>
          <p className="text-muted-foreground mt-6 text-xl">{copy.social.text}</p>
          <p className="mt-6 text-2xl">
            {copy.social.line1} <br />
            <span className="text-primary">{copy.social.line2}</span>
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {copy.social.features.map((feature, index) => (
            <Reveal key={feature} className={index === 0 ? "sm:col-span-2" : ""} delay={index * 0.05}>
              <IconCard icon={socialIcons[index]} label={feature} wide={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
