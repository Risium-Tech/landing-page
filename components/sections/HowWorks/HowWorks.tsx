"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import StepCard from "@/components/ui/StepCard";
import "keen-slider/keen-slider.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

export default function HowWorks() {
  const t = useTranslations("HomePage.how");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <section className="-10 relative w-full overflow-hidden py-48 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/banner-works.png"
          alt="Estádio cheio"
          fill
          className="object-cover"
          priority
        />
        <div className="bg-blue-darker/40 absolute inset-0" />
      </div>

      {/* Content */}
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-20">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-3xl lg:text-6xl">
            <span className="border-yellow-normal inline-block border-b-4 pb-1">{t("title")}</span>
          </h2>
          <p className="text-3xl">{t("subtitle")}</p>
        </div>

        {/* Steps → vira slider no mobile */}
        <div className="w-full max-w-6xl px-4">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">
              <StepCard
                icon={
                  <Image
                    src="/svg/football-player-icon.svg"
                    alt={t("steps.step1.alt")}
                    width={40}
                    height={40}
                  />
                }
                title={t("steps.step1.title")}
                description={t("steps.step1.description")}
              />
            </div>

            <div className="keen-slider__slide">
              <StepCard
                icon={
                  <Image
                    src="/svg/geo-icon.svg"
                    alt={t("steps.step2.alt")}
                    width={40}
                    height={40}
                  />
                }
                title={t("steps.step2.title")}
                description={t("steps.step2.description")}
              />
            </div>

            <div className="keen-slider__slide">
              <StepCard
                icon={
                  <Image
                    src="/svg/christmas-stars-icon.svg"
                    alt={t("steps.step3.alt")}
                    width={40}
                    height={40}
                  />
                }
                title={t("steps.step3.title")}
                description={t("steps.step3.description")}
              />
            </div>
          </div>

          {/* Bullets */}
          <div className="mt-6 flex justify-center gap-3 md:hidden">
            {[...Array(instanceRef.current?.track.details.slides.length || 0)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`h-3 w-3 rounded-full transition ${
                  currentSlide === idx ? "bg-yellow-400" : "bg-gray-300/50"
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
