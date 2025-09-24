"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function About() {
  const t = useTranslations("HomePage.about");

  return (
    <section className="relative w-full bg-white py-20">
      <div className="bg-[url('/svg/vector.svg')] bg-contain bg-bottom bg-no-repeat text-gray-800 md:bg-right">
        <div className="container mx-auto flex flex-col items-center gap-12 md:flex-row md:gap-20">
          {/* Imagem à esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/about-image.png"
                alt={t("imageAlt")}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Texto à direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 p-4 lg:p-0"
          >
            <h2 className="text-3xl font-extrabold text-black md:text-3xl lg:text-6xl">
              <span className="border-yellow-normal inline-block border-b-4 pb-1">
                {t("title")}
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-2xl leading-relaxed text-gray-700">{t("text")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
