"use client";

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");

  const handleScroll = (id: string) => {
    const offset = -80;

    const lenis = (window as any).lenis;
    const el = document.querySelector(id);

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;

      if (lenis) {
        lenis.scrollTo(top);
      } else {
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="bg-blue-dark text-white" id="contact">
      {/* Newsletter */}
      <div className="border-yellow-normal bg-blue-dark space-y-9 border-t-4 px-4 py-16 text-center md:px-0">
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
      <div className="container mx-auto flex flex-wrap justify-between border-t border-b border-gray-700 px-4 py-24 md:px-0">
        {/* Contato */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase">{t("contact.title")}</h3>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Image
                src="/svg/phone-icon.svg"
                alt="Telefone"
                width={20}
                height={20}
                className="opacity-90"
              />
              <a
                href="https://wa.me/351920406913"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +351 920 406 913
              </a>
            </p>
            <p className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" />
              <a href="mailto:comercial@upconnections-app.com" className="hover:underline">
                comercial@upconnections-app.com
              </a>
            </p>
          </div>
        </div>

        {/* Links úteis */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase">{t("links.title")}</h3>
          <ul className="space-y-2">
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll("#home")}>
                {t("links.home")}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll("#about")}>
                {t("links.about")}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll("#how")}>
                {t("links.how")}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll("#benefits")}>
                {t("links.benefits")}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll("#feedbacks")}>
                {t("links.feedbacks")}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll("#contact")}>
                {t("links.contact")}
              </button>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase">{t("social.title")}</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Image src="/svg/instagram-icon.svg" alt="Instagram" width={20} height={20} />
              @upconnections
            </li>

            <li className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/up-connections/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Image
                  src="/svg/linkedin-icon.svg"
                  alt="LinkedIn"
                  width={18}
                  height={18}
                  className="brightness-0 contrast-200 invert saturate-0"
                />
                up-connections
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy */}
      <div className="py-6 text-center text-sm text-gray-400">
        © 2025 <span className="font-bold">Up Connections</span> | {t("rights")}
      </div>
    </footer>
  );
}
