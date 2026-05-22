import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: "Up Connections",
  description:
    "Plataforma de sincronização ao vivo para criar mosaicos interativos, experiências de luz e engajamento coletivo em grandes eventos.",
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
