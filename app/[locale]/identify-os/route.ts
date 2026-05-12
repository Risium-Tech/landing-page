import { NextRequest, NextResponse } from "next/server";
import { APPLE_STORE_URL, identifyStoreTarget, PLAY_STORE_URL } from "@/utils/storeLinks";

const locales = ["en", "pt", "es", "pt-pt"];
const defaultLocale = "pt";

type RouteContext = {
  params: Promise<{
    locale: string;
  }>;
};

function getValidLocale(locale: string) {
  return locales.includes(locale) ? locale : defaultLocale;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { locale } = await context.params;
  const target = identifyStoreTarget({
    userAgent: request.headers.get("user-agent") || "",
  });

  if (target === "ios") {
    return NextResponse.redirect(APPLE_STORE_URL);
  }

  if (target === "android") {
    return NextResponse.redirect(PLAY_STORE_URL);
  }

  const homeUrl = new URL(`/${getValidLocale(locale)}`, request.url);
  homeUrl.hash = "download";

  return NextResponse.redirect(homeUrl);
}
