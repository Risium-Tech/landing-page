"use client";

import GradientButton from "@/components/ui/GradientButton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function HeroBanner() {
  const t = useTranslations("HomePage");

  return (
    <section className="-10 relative w-full overflow-hidden text-white md:pt-10">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/banner-bg.png"
          alt="Estádio cheio"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="container mx-auto flex w-full flex-wrap items-center justify-center py-20 md:flex-row md:py-0">
        {/* Texto à esquerda */}
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-yellow-normal text-3xl leading-tight font-extrabold md:text-6xl">
            {t("hero.title")}
          </h2>
          <p className="mt-4 text-5xl text-white">{t("hero.subtitle")}</p>

          <div className="mt-6">
            <GradientButton href="/about" variant="yellow" className="rounded-md">
              <div className="flex items-center justify-center gap-2">
                {t("hero.cta")}
                <ArrowRightIcon className="h-5 w-5" />
              </div>
            </GradientButton>
          </div>
        </div>

        <div className="hidden flex-wrap md:flex">
          <Image
            src="/images/banner-girl.png"
            alt="Torcedora com celular e bola"
            width={900}
            height={720}
            className="h-auto w-full md:max-w-2xl lg:max-w-none"
            priority
          />
        </div>
      </div>

      <div className="bg-blue-dark p-6">
        <p className="text-yellow-normal text-center text-2xl font-medium">{t("hero.call")}</p>
      </div>
    </section>
  );
}
