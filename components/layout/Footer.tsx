"use client";

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-blue-dark text-white">
      {/* Newsletter */}
      <div className="border-yellow-normal bg-blue-dark space-y-9 border-t-4 py-16 text-center">
        <h2 className="text-2xl font-bold">{t("newsletter.title")}</h2>
        <form className="mx-auto flex w-full max-w-lg overflow-hidden rounded-full bg-white">
          <input
            type="email"
            placeholder={t("newsletter.placeholder")}
            className="flex-1 px-4 py-3 text-black outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-normal hover:bg-yellow-normal-hover rounded-full px-8 font-bold text-white transition"
          >
            {t("newsletter.button")}
          </button>
        </form>
      </div>

      {/* Links */}
      <div className="container mx-auto flex justify-between border-t border-b border-gray-700 py-24">
        {/* Contato */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase">{t("contact.title")}</h3>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              +11 99999-9999
            </p>
            <p className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" />
              <a href="mailto:contato@upconnection.com" className="hover:underline">
                contato@upconnection.com
              </a>
            </p>
          </div>
        </div>

        {/* Links úteis */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase">{t("links.title")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/">{t("links.home")}</Link>
            </li>
            <li>
              <Link href="/about">{t("links.about")}</Link>
            </li>
            <li>
              <Link href="/how">{t("links.how")}</Link>
            </li>
            <li>
              <Link href="/benefits">{t("links.benefits")}</Link>
            </li>
            <li>
              <Link href="/feedbacks">{t("links.feedbacks")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("links.contact")}</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase">{t("social.title")}</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Image src="/svg/instagram-icon.svg" alt="Instagram" width={20} height={20} />
              @upconnection
            </li>
            <li className="flex items-center gap-2">
              <Image src="/svg/facebook-icon.svg" alt="Facebook" width={20} height={20} />
              @upconnection
            </li>
          </ul>
        </div>
      </div>

      {/* Copy */}
      <div className="py-6 text-center text-sm text-gray-400">
        © 2025 <span className="font-bold">Up Connection</span> | {t("rights")}
      </div>
    </footer>
  );
}
