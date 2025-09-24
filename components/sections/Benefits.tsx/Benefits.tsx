"use client";

import { useTranslations } from "next-intl";
import SquareCard from "@/components/ui/SquareCard";
import GradientButton from "@/components/ui/GradientButton";

export default function Benefits() {
  const t = useTranslations("HomePage.benefits");

  return (
    <section className="w-full overflow-hidden bg-white bg-[url('/svg/bg-vector.svg')] py-30 text-black">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-20">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-extrabold md:text-3xl lg:text-6xl">
            <span className="border-yellow-normal inline-block border-b-4 pb-1">{t("title")}</span>
          </h2>
          <p className="text-3xl">{t("subtitle")}</p>
        </div>
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-5">
          <SquareCard
            iconSrc="/svg/stadium-icon.svg"
            iconAlt={t("cards.card1.alt")}
            title={t("cards.card1.title")}
            description={t("cards.card1.description")}
          />
          <SquareCard
            iconSrc="/svg/stadium-2-icon.svg"
            iconAlt={t("cards.card2.alt")}
            title={t("cards.card2.title")}
            description={t("cards.card2.description")}
          />
          <SquareCard
            iconSrc="/svg/share-icon.svg"
            iconAlt={t("cards.card3.alt")}
            title={t("cards.card3.title")}
            description={t("cards.card3.description")}
          />
          <SquareCard
            iconSrc="/svg/marketing-icon.svg"
            iconAlt={t("cards.card4.alt")}
            title={t("cards.card4.title")}
            description={t("cards.card4.description")}
          />
          <SquareCard
            iconSrc="/svg/idea-icon.svg"
            iconAlt={t("cards.card5.alt")}
            title={t("cards.card5.title")}
            description={t("cards.card5.description")}
          />
        </div>
        <GradientButton href="/download">{t("cta")}</GradientButton>
      </div>
    </section>
  );
}
