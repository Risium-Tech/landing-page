"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import StepCard from "@/components/ui/StepCard";

export default function HowWorks() {
  const t = useTranslations("HomePage.how");

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
        <div className="flex flex-col gap-8 md:flex-row md:gap-4">
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
          <StepCard
            icon={
              <Image src="/svg/geo-icon.svg" alt={t("steps.step2.alt")} width={40} height={40} />
            }
            title={t("steps.step2.title")}
            description={t("steps.step2.description")}
          />
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
    </section>
  );
}
