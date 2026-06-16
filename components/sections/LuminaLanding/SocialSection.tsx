import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ShareIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { LandingCopy } from "./shared";
import { Reveal, SectionTag, SectionTitle } from "./shared";

const socialStats = [
  { icon: HeartIcon, value: "9.8k" },
  { icon: ChatBubbleOvalLeftIcon, value: "1.2k" },
  { icon: ShareIcon, value: "630" },
];

export default function SocialSection({ copy }: { copy: LandingCopy }) {
  const mainFeature = copy.social.features[0];
  const highlightFeatures = copy.social.features.slice(1, 3);
  const supportFeatures = copy.social.features.slice(3);
  const allFeatures = [mainFeature, ...highlightFeatures, ...supportFeatures];

  return (
    <section id="solutions" className="content-auto-section relative overflow-hidden py-32">
      <div className="from-background via-night to-background absolute inset-0 bg-gradient-to-b" />
      <div className="bg-primary/8 absolute top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl" />

      <div className="relative mx-auto grid max-w-[1560px] items-start gap-16 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="max-w-2xl">
          <SectionTag>{copy.social.tag}</SectionTag>
          <SectionTitle className="mt-6">{copy.social.title}</SectionTitle>
          <p className="text-muted-foreground mt-6 text-xl leading-8">{copy.social.text}</p>
          <p className="mt-6 text-2xl leading-snug">
            {copy.social.line1}
            <br />
            <span className="text-primary">{copy.social.line2}</span>
          </p>

          <Reveal delay={0.08} className="mt-8 rounded-[28px] border border-white/8 bg-white/4 p-5">
            <p className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
              Destaques sociais
            </p>
            <div className="mt-4 space-y-3">
              {allFeatures.map((feature, index) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="bg-primary/12 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    {index === 0 && <ChatBubbleOvalLeftIcon className="text-primary h-5 w-5" />}
                    {index === 1 && <ShareIcon className="text-primary h-5 w-5" />}
                    {index === 2 && <HeartIcon className="text-primary h-5 w-5" />}
                    {index === 3 && <SparklesIcon className="text-primary h-5 w-5" />}
                    {index === 4 && <UsersIcon className="text-primary h-5 w-5" />}
                  </div>
                  <span className="text-sm font-medium text-white sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Reveal>

        <div className="relative mx-auto w-full max-w-[700px]">
          <Reveal className="relative">
            <div className="glass-border shadow-[0_30px_80px_-40px_oklch(0.05_0.03_255_/_0.9)] relative overflow-hidden rounded-[34px] bg-[linear-gradient(160deg,oklch(0.22_0.06_252_/_0.84),oklch(0.15_0.05_255_/_0.94))] p-6 md:p-8">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.74_0.17_148_/_0.12),transparent_42%)]" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/15 flex h-12 w-12 items-center justify-center rounded-2xl">
                      <UsersIcon className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">UP Moments</p>
                      <p className="text-muted-foreground text-xs">{copy.social.tag}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-[30px] border border-white/8 bg-[linear-gradient(145deg,oklch(0.2_0.05_252_/_0.9),oklch(0.15_0.05_255_/_0.96))] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl leading-tight font-semibold text-white">
                        {copy.social.line2}
                      </p>
                    </div>

                    <div className="bg-background/80 hidden h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl md:flex">
                      <DotLottieReact
                        src="/animations/lmao-emoji.lottie"
                        autoplay
                        loop
                        className="h-14 w-14"
                      />
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[26px] border border-white/8 bg-white/4">
                    <div className="min-h-[320px] bg-[radial-gradient(circle_at_top_left,oklch(0.74_0.17_148_/_0.2),transparent_35%),linear-gradient(140deg,oklch(0.18_0.05_252),oklch(0.12_0.04_255))] p-5 sm:p-6 md:aspect-[16/10] md:min-h-0">
                      <div className="flex h-full flex-col gap-6 md:justify-between">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/15 flex h-10 w-10 items-center justify-center rounded-full">
                              <SparklesIcon className="text-primary h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">Experiência coletiva</p>
                            </div>
                          </div>

                          <div className="bg-background/60 flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl">
                            <DotLottieReact
                              src="/animations/love-emoji.lottie"
                              autoplay
                              loop
                              className="h-11 w-11 rounded-2xl"
                            />
                          </div>
                        </div>

                        <div>
                          <p className="max-w-lg text-xl leading-[1.2] font-semibold text-white sm:text-2xl md:text-3xl">
                            O público participa, compartilha e amplia o alcance do evento.
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-1">
                          {highlightFeatures.map((feature, index) => (
                            <div
                              key={feature}
                              className="bg-background/60 flex items-center gap-2 rounded-full border border-white/8 px-4 py-2"
                            >
                              {index === 0 ? (
                                <ShareIcon className="text-primary h-4 w-4" />
                              ) : (
                                <HeartIcon className="text-primary h-4 w-4" />
                              )}
                              <span className="text-sm font-medium text-white">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-background/70 flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl">
                        <DotLottieReact
                          src="/animations/wow-emoji.lottie"
                          autoplay
                          loop
                          className="h-10 w-10"
                        />
                      </div>
                      <p className="text-sm font-semibold text-white">{mainFeature}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {socialStats.map(({ icon: IconComponent, value }) => (
                        <div
                          key={value}
                          className="bg-background/55 flex items-center gap-2 rounded-full border border-white/8 px-3 py-2"
                        >
                          <IconComponent className="text-primary h-4 w-4" />
                          <span className="text-sm font-semibold text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
