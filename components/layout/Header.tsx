"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { scrollToSection } from "@/utils/scrollToSection";
import type { LandingCopy } from "@/components/sections/LuminaLanding/shared";

const languages = [
  { code: "pt", flag: "https://flagcdn.com/br.svg", label: "Português (BR)" },
  { code: "pt-pt", flag: "https://flagcdn.com/pt.svg", label: "Português (PT)" },
  { code: "en", flag: "https://flagcdn.com/us.svg", label: "English" },
  { code: "es", flag: "https://flagcdn.com/es.svg", label: "Español" },
];

export default function Header({ copy, locale }: { copy: LandingCopy; locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const langRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find((language) => language.code === locale) || languages[0];
  const navItems = [
    { label: copy.nav.home, href: "#home" },
    { label: copy.nav.technology, href: "#technology" },
    { label: copy.nav.experiences, href: "#experiences" },
    { label: copy.nav.solutions, href: "#solutions" },
    { label: copy.nav.sponsors, href: "#sponsors" },
    { label: copy.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    let frameId = 0;
    let lastScrolled = window.scrollY > 20;

    setScrolled(lastScrolled);

    const updateScrolled = () => {
      frameId = 0;
      const nextScrolled = window.scrollY > 20;

      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const onScroll = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(updateScrolled);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (nextLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = nextLocale;
    router.push("/" + segments.join("/"));
    setLangOpen(false);
  };

  const handleScroll = (id: string) => {
    scrollToSection(id, locale, pathname, router);
    setIsOpen(false);
  };

  const handleDownload = () => {
    window.location.href = `/${locale}/identify-os`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-night-deep/75 shadow-soft-glow backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto grid min-h-20 w-full max-w-[1880px] grid-cols-[auto_1fr_auto] items-center gap-8 px-8 py-3 md:px-10 xl:px-12">
        <Link
          href={`/${locale}`}
          onClick={(event) => {
            if (pathname === `/${locale}` || pathname === "/") {
              event.preventDefault();
              handleScroll("#home");
            }
          }}
          className="group flex items-center gap-2"
        >
          <Image
            src="/svg/logo.svg"
            alt="Up Connections"
            width={80}
            height={98}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        <ul className="hidden items-center justify-center gap-9 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => handleScroll(item.href)}
                className="after:bg-primary text-muted-foreground hover:text-primary relative text-base font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:transition-all hover:after:w-full"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-4">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((value) => !value)}
              aria-label={copy.nav.changeLanguage}
              className="glass-border bg-card-glass flex min-h-11 min-w-14 items-center justify-center rounded-full px-4 py-2.5 transition hover:bg-primary/10"
            >
              <Image src={currentLang.flag} alt={currentLang.label} width={30} height={30} unoptimized />
            </button>

            {langOpen && (
              <div className="glass-border bg-night-deep/95 absolute right-0 mt-3 flex min-w-20 flex-col rounded-2xl p-2 shadow-soft-glow backdrop-blur-xl">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => handleLanguageChange(language.code)}
                    className="flex min-h-12 items-center justify-center rounded-xl px-4 py-3 transition hover:bg-primary/10"
                    aria-label={language.label}
                  >
                    <Image src={language.flag} alt={language.label} width={34} height={34} unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="bg-glow text-primary-foreground shadow-soft-glow hidden rounded-full px-6 py-3 text-base font-semibold transition-all hover:scale-[1.03] hover:shadow-glow lg:inline-flex"
          >
            {copy.nav.download}
          </button>

          <button
            type="button"
            className="text-foreground lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? copy.nav.closeMenu : copy.nav.openMenu}
          >
            {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-night-deep/95 px-4 py-6 backdrop-blur-xl md:px-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => handleScroll(item.href)}
                  className="text-lg text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleDownload}
            className="bg-glow text-primary-foreground mt-6 w-full rounded-full px-5 py-3 font-semibold"
          >
            {copy.nav.download}
          </button>
        </div>
      )}
    </header>
  );
}
