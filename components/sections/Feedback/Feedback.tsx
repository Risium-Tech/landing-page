"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import FeedbackCard from "@/components/ui/FeedbackCard";
import { motion } from "framer-motion";

export default function Feedback() {
  const t = useTranslations("HomePage.feedbacks");

  return (
    <section className="relative w-full overflow-hidden py-36">
      {/* Background otimizado */}
      <Image
        src="/images/stadium-bg.png"
        alt={t("backgroundAlt")}
        fill
        priority
        className="-z-10 object-cover object-center"
      />

      {/* Conteúdo */}
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-20">
        {/* Cabeçalho */}
        <motion.div
          className="space-y-4 text-center text-black"
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

        {/* Cards */}
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-16 lg:grid-cols-3">
          {[
            {
              name: t("cards.card1.name"),
              role: t("cards.card1.role"),
              feedback: t("cards.card1.feedback"),
              avatar: "/images/feedbacks/person-yellow.jpg",
              altAvatar: t("cards.card1.altAvatar"),
              quoteBgAlt: t("cards.card1.quoteBgAlt"),
              quoteIconAlt: t("cards.card1.quoteIconAlt"),
            },
            {
              name: t("cards.card2.name"),
              role: t("cards.card2.role"),
              feedback: t("cards.card2.feedback"),
              avatar: "/images/feedbacks/person-orange.jpg",
              altAvatar: t("cards.card2.altAvatar"),
              quoteBgAlt: t("cards.card2.quoteBgAlt"),
              quoteIconAlt: t("cards.card2.quoteIconAlt"),
            },
            {
              name: t("cards.card3.name"),
              role: t("cards.card3.role"),
              feedback: t("cards.card3.feedback"),
              avatar: "/images/feedbacks/person-grey.jpg",
              altAvatar: t("cards.card3.altAvatar"),
              quoteBgAlt: t("cards.card3.quoteBgAlt"),
              quoteIconAlt: t("cards.card3.quoteIconAlt"),
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <FeedbackCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
