"use client";

import { useTranslations } from "next-intl";
import SquareCard from "@/components/ui/SquareCard";
import GradientButton from "@/components/ui/GradientButton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.css";
import { motion } from "framer-motion";

export default function Benefits() {
  const t = useTranslations("HomePage.benefits");

  const autoplay = (slider: any) => {
    if (window.innerWidth >= 768) return;
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
      }, 2000);
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
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold md:text-3xl lg:text-6xl">
            <span className="border-yellow-normal inline-block border-b-4 pb-1">{t("title")}</span>
          </h2>
          <p className="text-3xl">{t("subtitle")}</p>
        </motion.div>

        {/* Grid no desktop / Slider no mobile */}
        <div className="container px-4">
          <div
            ref={sliderRef}
            className="keen-slider grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-5"
          >
            {[
              {
                src: "/svg/stadium-icon.svg",
                alt: t("cards.card1.alt"),
                title: t("cards.card1.title"),
                desc: t("cards.card1.description"),
              },
              {
                src: "/svg/stadium-2-icon.svg",
                alt: t("cards.card2.alt"),
                title: t("cards.card2.title"),
                desc: t("cards.card2.description"),
              },
              {
                src: "/svg/share-icon.svg",
                alt: t("cards.card3.alt"),
                title: t("cards.card3.title"),
                desc: t("cards.card3.description"),
              },
              {
                src: "/svg/marketing-icon.svg",
                alt: t("cards.card4.alt"),
                title: t("cards.card4.title"),
                desc: t("cards.card4.description"),
              },
              {
                src: "/svg/idea-icon.svg",
                alt: t("cards.card5.alt"),
                title: t("cards.card5.title"),
                desc: t("cards.card5.description"),
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                className="keen-slider__slide px-2 py-10 md:!transform-none"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <SquareCard
                  iconSrc={card.src}
                  iconAlt={card.alt}
                  title={card.title}
                  description={card.desc}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botão CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <GradientButton href="/download">{t("cta")}</GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
