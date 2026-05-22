import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import LuminaLanding from "@/components/sections/LuminaLanding/LuminaLanding";
import Footer from "@/components/layout/Footer";
import { getLandingCopy } from "@/utils/landingCopy";

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params;
  const copy = getLandingCopy(locale);

  return {
    title: copy.seo.title,
    description: copy.seo.description,
    openGraph: {
      title: copy.seo.title,
      description: copy.seo.description,
      siteName: "Up Connections",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seo.title,
      description: copy.seo.description,
    },
  };
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getLandingCopy(locale);

  return (
    <>
      <Header copy={copy} locale={locale} />
      <LuminaLanding copy={copy} />
      <Footer copy={copy} locale={locale} />
    </>
  );
}
