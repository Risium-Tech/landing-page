import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import LuminaLanding from "@/components/sections/LuminaLanding/LuminaLanding";
import Footer from "@/components/layout/Footer";
import { getLandingCopy } from "@/utils/landingCopy";
import { routing } from "@/i18n/routing";

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params;
  const copy = getLandingCopy(locale);
  const seoKeywords = [...copy.seo.keywords];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://upconnections-app.com";
  const pageUrl = `${siteUrl}/${locale}`;
  const ogImage = `${siteUrl}/images/inspiration-banner.png`;
  const languages = Object.fromEntries(
    routing.locales.map((availableLocale) => [availableLocale, `${siteUrl}/${availableLocale}`]),
  );

  return {
    title: copy.seo.title,
    description: copy.seo.description,
    keywords: seoKeywords,
    alternates: {
      canonical: pageUrl,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: copy.seo.title,
      description: copy.seo.description,
      url: pageUrl,
      siteName: "Up Connections",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: copy.seo.title,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seo.title,
      description: copy.seo.description,
      images: [ogImage],
    },
  };
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getLandingCopy(locale);
  const seoKeywords = [...copy.seo.keywords];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://upconnections-app.com";
  const pageUrl = `${siteUrl}/${locale}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Up Connections",
    url: pageUrl,
    description: copy.seo.description,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: "Up Connections",
      url: siteUrl,
    },
    about: seoKeywords,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header copy={copy} locale={locale} />
      <LuminaLanding copy={copy} />
      <Footer copy={copy} locale={locale} />
    </>
  );
}
