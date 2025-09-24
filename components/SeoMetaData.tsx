import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateSeoMetadata({
  locale,
  namespace = "Common",
  pathname = "",
  image = "/og-image.png",
  baseUrl = "https://upconnections.com",
}: {
  locale: string;
  namespace?: string;
  pathname?: string;
  image?: string;
  baseUrl?: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const url = `${baseUrl}${pathname ? `/${locale}${pathname}` : ""}`;

  return {
    title: t("seo.title"),
    description: t("seo.description"),
    openGraph: {
      title: t("seo.title"),
      description: t("seo.description"),
      url,
      siteName: "Up Connections",
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: "Up Connections",
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.title"),
      description: t("seo.description"),
      images: [`${baseUrl}${image}`],
    },
  };
}
