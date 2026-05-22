"use client";

import Link from "next/link";
import Image from "next/image";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import type { LandingCopy } from "@/components/sections/LuminaLanding/shared";

export default function Footer({ copy, locale }: { copy: LandingCopy; locale: string }) {
  return (
    <footer id="contact" className="relative border-t border-border bg-night-deep">
      <div className="mx-auto max-w-[1560px] px-4 py-20 md:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="mb-4 inline-flex items-end gap-3">
              <Image
                src="/svg/logo.svg"
                alt="Up Connections"
                width={96}
                height={118}
                className="h-16 w-auto object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-foreground">Connections</span>
            </Link>
            <p className="max-w-md text-sm text-muted-foreground">{copy.footer.text}</p>
          </div>

          <div>
            <p className="text-primary mb-4 text-sm tracking-[0.2em] uppercase">{copy.footer.contact}</p>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="mailto:comercial@upconnections-app.com"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                  comercial@upconnections-app.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/351920406913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <PhoneIcon className="h-4 w-4" />
                  +351 920 406 913
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-primary mb-4 text-sm tracking-[0.2em] uppercase">{copy.footer.legal}</p>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href={`/${locale}/terms-conditions`} className="transition-colors hover:text-primary">
                  {copy.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy-policy`} className="transition-colors hover:text-primary">
                  {copy.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/account-cancellation-policy`} className="transition-colors hover:text-primary">
                  {copy.footer.cancellation}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="text-gradient text-3xl font-bold md:text-5xl">UP CONNECTIONS</p>
          <p className="text-primary mt-3 text-sm tracking-[0.3em] uppercase">{copy.footer.tagline}</p>
          <p className="mt-8 text-xs text-muted-foreground">
            Copyright {new Date().getFullYear()} Up Connections. {copy.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
