import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";
import { getLandingCopy } from "@/utils/landingCopy";

export const metadata = {
  title: "Política de Privacidade - Up Connections",
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getLandingCopy(locale);
  const t = await getTranslations("privacyPolicy");

  // Todas as seções estruturadas
  const sections = t.raw("sections");

  return (
    <>
      <Header copy={copy} locale={locale} />

      <main className="bg-white">
        <section className="container mx-auto max-w-4xl px-4 py-16 text-gray-900 md:px-6">
          {/* Título */}
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">{t("title")}</h1>

          {/* Introdução */}
          <p className="mb-4">{t("intro")}</p>

          {/* Renderização dinâmica das seções */}
          {Object.keys(sections).map((key) => {
            const section = sections[key];

            return (
              <div key={key} className="mt-8">
                <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>

                {/* parágrafos */}
                {section.paragraphs?.map((p: string, i: number) => (
                  <p key={i} className="mb-4">
                    {p}
                  </p>
                ))}

                {/* lista */}
                {section.list && (
                  <ul className="mb-4 list-disc pl-6">
                    {section.list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* footer da seção */}
                {section.footer && <p className="mb-4">{section.footer}</p>}
              </div>
            );
          })}
        </section>
      </main>

      <Footer copy={copy} locale={locale} />
    </>
  );
}
