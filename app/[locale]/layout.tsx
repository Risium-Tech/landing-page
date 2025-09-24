import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

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
