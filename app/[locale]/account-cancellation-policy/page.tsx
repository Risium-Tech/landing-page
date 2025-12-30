import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Política de Cancelamento de Conta - Up Connections",
};

export default function AccountCancellationPolicyPage() {
  const t = useTranslations("accountCancellationPolicy");
  const sections = t.raw("sections");

  const whatsappHref = `https://wa.me/351920406913?text=${encodeURIComponent(
    t("whatsapp.message"),
  )}`;

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="container mx-auto max-w-4xl px-6 py-16 text-gray-900">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">{t("title")}</h1>

          <p className="mb-4">{t("intro")}</p>

          {Object.keys(sections).map((key) => {
            const section = sections[key];

            if (key === "contact") return null;

            return (
              <div key={key} className="mt-8">
                <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>

                {section.paragraphs?.map((p: string, i: number) => (
                  <p key={i} className="mb-4">
                    {p}
                  </p>
                ))}

                {section.list && (
                  <ul className="mb-4 list-disc pl-6">
                    {section.list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footer && <p className="mb-4">{section.footer}</p>}
              </div>
            );
          })}

          <p className="mt-8">{t("sections.contact.text")}</p>

          <div className="mt-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-normal hover:bg-green-normal-hover active:bg-green-normal-active inline-flex items-center justify-center rounded-full px-8 py-3 font-bold text-white transition"
            >
              {t("whatsapp.button")}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

