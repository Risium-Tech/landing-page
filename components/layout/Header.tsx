"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import GradientButton from "../ui/GradientButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "how", href: "/how-it-works" },
  { key: "benefits", href: "/benefits" },
  { key: "feedbacks", href: "/feedbacks" },
  { key: "contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Header");

  return (
    <header className="border-yellow-normal sticky top-0 z-50 border-b-4 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image src="/svg/logo.svg" alt="Up Connections" width={70} height={40} />
        </Link>

        {/* Nav (desktop) */}
        <nav className="hidden items-center space-x-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-semibold tracking-wide uppercase ${
                pathname === item.href
                  ? "text-blue-normal"
                  : "text-gray-dark hover:text-blue-normal"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* CTA (desktop) */}
        <div className="hidden lg:block">
          <GradientButton href="/download" variant="blueGreen">
            {t("download")}
          </GradientButton>
        </div>

        {/* Mobile toggle button */}
        <button
          className="rounded-full bg-[image:var(--gradient-blue-green)] p-3 text-white transition hover:opacity-90 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="h-7 w-7" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-7 w-7" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile dropdown menu com animação */}
      <div
        className={`overflow-hidden bg-white shadow-lg transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
        }`}
      >
        <nav className="flex flex-col space-y-3 px-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-semibold uppercase ${
                pathname === item.href
                  ? "text-blue-normal"
                  : "text-gray-dark hover:text-blue-normal"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <GradientButton href="/download" className="text-center text-sm">
            {t("download")}
          </GradientButton>
        </nav>
      </div>
    </header>
  );
}
