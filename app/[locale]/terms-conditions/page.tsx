import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Termos e Condições – Up Connections",
};

export default function TermsAndConditionsPage() {
  const t = useTranslations("termsConditions");
  const sections = t.raw("sections");

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="container mx-auto max-w-4xl px-6 py-16 text-gray-900">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">{t("title")}</h1>

          <p className="mb-4">{t("intro")}</p>

          {Object.keys(sections).map((key) => {
            const section = sections[key];

            // Ignora a chave 'contact'
            if (key === "contact") return null;

            return (
              <div key={key} className="mt-8">
                <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>

                {section.paragraphs?.map((p: string, i: number) => (
                  <p key={i} className="mb-4">
                    {p}
                  </p>
                ))}
              </div>
            );
          })}

          {/* Contact message */}
          <p className="mt-8">{t("sections.contact.text")}</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
