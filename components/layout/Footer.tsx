"use client";

"use client";

import Link from "next/link";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import type { LandingCopy } from "@/components/sections/LuminaLanding/shared";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.04 2a9.88 9.88 0 0 0-8.47 14.95L2.5 22l5.18-1.04A9.87 9.87 0 1 0 12.04 2Zm0 1.8a8.07 8.07 0 1 1-3.82 15.18l-.28-.15-3.14.63.65-3.06-.18-.3A8.07 8.07 0 0 1 12.04 3.8Zm-3.25 4.1c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.9 3.04 4.7 4.14 2.33.92 2.8.74 3.31.7.51-.05 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32-.28-.14-1.64-.81-1.89-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.46-.62-.47h-.52Z" />
    </svg>
  );
}

export default function Footer({ copy, locale }: { copy: LandingCopy; locale: string }) {
  const handleEmailClick = () => {
    const emailAddress = ["comercial", "upconnections-app.com"].join("@");
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <footer id="contact" className="border-border bg-night-deep relative border-t">
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
              <span className="text-foreground text-lg font-bold tracking-tight">Connections</span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm">{copy.footer.text}</p>
          </div>

          <div>
            <p className="text-primary mb-4 text-sm tracking-[0.2em] uppercase">
              {copy.footer.contact}
            </p>
            <ul className="text-muted-foreground space-y-3">
              <li>
                <button
                  type="button"
                  onClick={handleEmailClick}
                  className="hover:text-primary flex items-center gap-3 transition-colors"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                  {copy.footer.emailLabel}
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/351920406913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-center gap-3 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  +351 920 406 913
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-primary mb-4 text-sm tracking-[0.2em] uppercase">
              {copy.footer.legal}
            </p>
            <ul className="text-muted-foreground space-y-3">
              <li>
                <Link
                  href={`/${locale}/terms-conditions`}
                  className="hover:text-primary transition-colors"
                >
                  {copy.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="hover:text-primary transition-colors"
                >
                  {copy.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/account-cancellation-policy`}
                  className="hover:text-primary transition-colors"
                >
                  {copy.footer.cancellation}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border mt-16 border-t pt-10 text-center">
          <p className="text-gradient text-3xl font-bold md:text-5xl">UP CONNECTIONS</p>
          <p className="text-primary mt-3 text-sm tracking-[0.3em] uppercase">
            {copy.footer.tagline}
          </p>
          <p className="text-muted-foreground mt-8 text-xs">
            Copyright {new Date().getFullYear()} Up Connections. {copy.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
