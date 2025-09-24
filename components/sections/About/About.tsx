"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("HomePage.about");

  return (
    <section className="relative w-full bg-white py-20">
      <div className="bg-[url('/svg/vector.svg')] bg-contain bg-bottom bg-no-repeat text-gray-800 md:bg-right">
        <div className="container mx-auto flex flex-col items-center gap-12 md:flex-row md:gap-20">
          {/* Imagem à esquerda */}
          <div className="flex-1">
            <div className="overflow-hidden">
              <Image
                src="/images/about-image.png"
                alt={t("imageAlt")}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Texto à direita */}
          <div className="flex-1 p-4 lg:p-0">
            <div>
              <h2 className="text-3xl font-extrabold text-black md:text-3xl lg:text-6xl">
                <span className="border-yellow-normal inline-block border-b-4 pb-1">
                  {t("title")}
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-2xl leading-relaxed text-gray-700">{t("text")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
