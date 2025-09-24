"use client";

import { useTranslations } from "next-intl";
import SquareCard from "@/components/ui/SquareCard";
import GradientButton from "@/components/ui/GradientButton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.css";

export default function Benefits() {
  const t = useTranslations("HomePage.benefits");

  const autoplay = (slider: any) => {
    let timeout: any;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 1800);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "snap",
      slides: { perView: 1.2, spacing: 16 },
      breakpoints: {
        "(min-width: 768px)": {
          disabled: true,
        },
      },
    },
    [autoplay]
  );

  return (
    <section className="w-full bg-white bg-[url('/svg/bg-vector.svg')] py-30 text-black">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-20">
        {/* Cabeçalho */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-extrabold md:text-3xl lg:text-6xl">
            <span className="border-yellow-normal inline-block border-b-4 pb-1">{t("title")}</span>
          </h2>
          <p className="text-3xl">{t("subtitle")}</p>
        </div>

        {/* Grid no desktop / Slider no mobile */}
        <div className="container px-4">
          <div
            ref={sliderRef}
            className="keen-slider grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-5"
          >
            <div className="keen-slider__slide px-2 py-10 md:!transform-none">
              <SquareCard
                iconSrc="/svg/stadium-icon.svg"
                iconAlt={t("cards.card1.alt")}
                title={t("cards.card1.title")}
                description={t("cards.card1.description")}
              />
            </div>
            <div className="keen-slider__slide px-2 py-10 md:!transform-none">
              <SquareCard
                iconSrc="/svg/stadium-2-icon.svg"
                iconAlt={t("cards.card2.alt")}
                title={t("cards.card2.title")}
                description={t("cards.card2.description")}
              />
            </div>
            <div className="keen-slider__slide px-2 py-10 md:!transform-none">
              <SquareCard
                iconSrc="/svg/share-icon.svg"
                iconAlt={t("cards.card3.alt")}
                title={t("cards.card3.title")}
                description={t("cards.card3.description")}
              />
            </div>
            <div className="keen-slider__slide px-2 py-10 md:!transform-none">
              <SquareCard
                iconSrc="/svg/marketing-icon.svg"
                iconAlt={t("cards.card4.alt")}
                title={t("cards.card4.title")}
                description={t("cards.card4.description")}
              />
            </div>
            <div className="keen-slider__slide px-2 py-10 md:!transform-none">
              <SquareCard
                iconSrc="/svg/idea-icon.svg"
                iconAlt={t("cards.card5.alt")}
                title={t("cards.card5.title")}
                description={t("cards.card5.description")}
              />
            </div>
          </div>
        </div>

        {/* Botão CTA */}
        <GradientButton href="/download">{t("cta")}</GradientButton>
      </div>
    </section>
  );
}
