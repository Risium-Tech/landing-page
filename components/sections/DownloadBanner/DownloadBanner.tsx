"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function DownloadBanner() {
  const t = useTranslations("HomePage.download");

  return (
    <section className="relative w-full bg-[url('/images/crowd-bg.png')] bg-cover bg-center py-52">
      <div className="absolute inset-0 -z-10 bg-black/70" />

      <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-6 text-center text-white">
        {/* Título */}
        <h2 className="text-yellow-normal text-3xl font-extrabold md:text-5xl lg:text-7xl">
          {t("title")}
        </h2>

        {/* Subtítulo */}
        <p className="max-w-4xl text-lg text-gray-200 md:text-xl">{t("subtitle")}</p>

        {/* Botões de download */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/googleplay-icon.png"
              alt={t("googlePlayAlt")}
              width={180}
              height={54}
            />
          </Link>
          <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
            <Image src="/images/appstore-icon.png" alt={t("appStoreAlt")} width={180} height={54} />
          </Link>
        </div>
      </div>
    </section>
  );
}
