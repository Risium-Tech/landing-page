"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function DownloadBanner() {
  const t = useTranslations("HomePage.download");
  const locale = useLocale();

  const handleInstallClick = () => {
    window.location.href = `/${locale}/identify-os`;
  };

  return (
    <section className="relative w-full bg-[url('/images/crowd-bg.png')] bg-cover bg-center py-52">
      <div className="absolute inset-0 -z-10 bg-black/70" />

      <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-6 text-center text-white">
        {/* título */}
        <motion.h2
          className="text-yellow-normal text-3xl font-extrabold md:text-5xl lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>

        {/* subtitulo */}
        <motion.p
          className="max-w-4xl text-lg text-gray-200 md:text-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t("subtitle")}
        </motion.p>

        {/* botão inteligente */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button onClick={handleInstallClick}>
            <Image
              src="/images/googleplay-icon.png"
              alt="download playstore"
              width={180}
              height={54}
            />
          </button>

          <button onClick={handleInstallClick}>
            <Image
              src="/images/appstore-icon.png"
              alt="download appstore"
              width={180}
              height={54}
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
