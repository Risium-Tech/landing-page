"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { scrollToSection } from "@/utils/scrollToSection";

const navItems = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "how", href: "#how" },
  { key: "benefits", href: "#benefits" },
  { key: "feedbacks", href: "#feedbacks" },
  { key: "contact", href: "#contact" },
];

const languages = [
  { code: "pt", flag: "https://flagcdn.com/br.svg", label: "Português (BR)" },
  { code: "pt-pt", flag: "https://flagcdn.com/pt.svg", label: "Português (PT)" },
  { code: "en", flag: "https://flagcdn.com/us.svg", label: "English" },
  { code: "es", flag: "https://flagcdn.com/es.svg", label: "Español" },
];

type InstallButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  locale: string;
};

function InstallButton({ children, className = "", locale, onClick }: InstallButtonProps) {
  const handleClick = () => {
    window.location.href = `/${locale}/identify-os`;
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-blue-green)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");

  const langRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageChange = (locale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = locale;
    router.push("/" + segments.join("/"));
    setLangOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScroll = (id: string) => {
    scrollToSection(id, locale, pathname, router);
    setIsOpen(false);
  };

  return (
    <header className="border-yellow-normal sticky top-0 z-50 border-b-4 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          onClick={(e) => {
            if (pathname === `/${locale}` || pathname === "/") {
              e.preventDefault();
              handleScroll("#home");
            }
          }}
        >
          <Image src="/svg/logo.svg" alt="Up Connections" width={70} height={40} />
        </Link>

        <nav className="hidden items-center space-x-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleScroll(item.href)}
              className="text-gray-dark hover:text-blue-normal text-sm font-semibold tracking-wide uppercase"
            >
              {t(item.key)}
            </button>
          ))}
        </nav>

        <div className="relative flex items-center gap-4">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Mudar idioma"
              className="flex items-center gap-2 rounded-md border px-2 py-1 shadow-sm hover:bg-gray-50"
            >
              <Image
                src={currentLang.flag}
                alt={currentLang.label}
                width={24}
                height={24}
                unoptimized
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 flex flex-col rounded-md border bg-white shadow-md">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <Image src={lang.flag} alt={lang.label} width={32} height={32} unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <InstallButton locale={locale}>{t("download")}</InstallButton>
          </div>

          <button
            className="rounded-full bg-[image:var(--gradient-blue-green)] p-3 text-white transition hover:opacity-90 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? (
              <XMarkIcon className="h-7 w-7" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-7 w-7" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="flex flex-col space-y-3 bg-white px-4 py-4 shadow-lg lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleScroll(item.href)}
              className="text-gray-dark hover:text-blue-normal text-sm font-semibold uppercase"
            >
              {t(item.key)}
            </button>
          ))}

          <InstallButton
            className="w-full text-center"
            locale={locale}
            onClick={() => setIsOpen(false)}
          >
            {t("download")}
          </InstallButton>
        </nav>
      )}
    </header>
  );
}
