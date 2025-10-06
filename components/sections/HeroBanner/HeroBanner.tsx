"use client";

import GradientButton from "@/components/ui/GradientButton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function HeroBanner() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative flex w-full flex-col justify-center overflow-hidden text-white md:pt-10">
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
      <div className="container mx-auto flex flex-wrap justify-around py-20 md:flex-row md:items-center md:py-0">
        {/* Texto à esquerda */}
        <div className="max-w-xl text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-yellow-normal text-3xl leading-tight font-extrabold md:text-4xl lg:text-6xl"
          >
            {t("hero.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-2xl text-white md:text-5xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 mb-12"
          >
            <GradientButton href="/about" variant="yellow" className="rounded-md">
              <div className="flex items-center justify-center gap-2">
                {t("hero.cta")}
                <ArrowRightIcon className="h-5 w-5" />
              </div>
            </GradientButton>
          </motion.div>
        </div>

        {/* Imagem à direita */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hidden items-center justify-center md:flex"
        >
          <Image
            src="/images/banner-girl.png"
            alt="Torcedora com celular e bola"
            width={900}
            height={720}
            className="h-auto w-[600px] object-contain md:w-[600px] lg:w-[800px]"
            priority
          />
        </motion.div>
      </div>

      <div className="bg-blue-dark p-6">
        <p className="text-yellow-normal text-center text-2xl font-medium">{t("hero.call")}</p>
      </div>
    </section>
  );
}
