import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://upconnections-app.com";
  const routes = ["", "/terms-conditions", "/privacy-policy", "/account-cancellation-policy"];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
    })),
  );
}
