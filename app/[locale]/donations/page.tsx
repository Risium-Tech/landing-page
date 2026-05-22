import { getTranslations } from "next-intl/server";
import DonationsClient from "@/components/donations/DonationsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donations" });
  return { title: t("meta_title") };
}

export default async function DonationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <DonationsClient locale={locale} />;
}
