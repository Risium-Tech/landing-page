import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://upconnections-app.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Up Connections",
  applicationName: "Up Connections",
  description:
    "Plataforma para shows de luzes com celulares, mosaicos interativos e experiências coletivas ao vivo em grandes eventos.",
  keywords: [
    "show de luzes",
    "mosaicos interativos",
    "sincronização de celulares",
    "experiência coletiva ao vivo",
    "tecnologia para eventos",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="pt">
      <body>
        <NextIntlClientProvider>
          <LenisProvider>{children}</LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
