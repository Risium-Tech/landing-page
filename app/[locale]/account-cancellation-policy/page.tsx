import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";
import { getLandingCopy } from "@/utils/landingCopy";

export const metadata = {
  title: "Política de Cancelamento de Conta - Up Connections",
  description:
    "Entenda como solicitar o cancelamento de conta na Up Connections e quais informações são necessárias para concluir o processo.",
};

export default async function AccountCancellationPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getLandingCopy(locale);
  const t = await getTranslations("accountCancellationPolicy");
  const sections = t.raw("sections");

  return (
    <>
      <Header copy={copy} locale={locale} />

      <main className="bg-white">
        <section className="container mx-auto max-w-4xl px-4 py-16 text-gray-900 md:px-6">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">{t("title")}</h1>

          <p className="mb-4">{t("intro")}</p>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold">{t("form.title")}</h2>
            <p className="mt-2 text-gray-700">{t("form.description")}</p>

            <form
              className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
              action="mailto:comercial@upconnections-app.com"
              method="post"
              encType="text/plain"
            >
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">{t("form.fields.fullName")}</span>
                <input
                  name="fullName"
                  type="text"
                  required
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">{t("form.fields.accountEmail")}</span>
                <input
                  name="accountEmail"
                  type="email"
                  required
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">{t("form.fields.username")}</span>
                <input
                  name="username"
                  type="text"
                  required
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">{t("form.fields.birthDate")}</span>
                <input
                  name="birthDate"
                  type="date"
                  required
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">{t("form.fields.phone")}</span>
                <input
                  name="phone"
                  type="tel"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">{t("form.fields.country")}</span>
                <input
                  name="country"
                  type="text"
                  required
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium">{t("form.fields.reason")}</span>
                <select
                  name="reason"
                  required
                  defaultValue=""
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="" disabled>
                    {t("form.fields.reasonPlaceholder")}
                  </option>
                  <option value="privacy">{t("form.reasons.privacy")}</option>
                  <option value="notUsing">{t("form.reasons.notUsing")}</option>
                  <option value="newAccount">{t("form.reasons.newAccount")}</option>
                  <option value="technicalIssues">{t("form.reasons.technicalIssues")}</option>
                  <option value="other">{t("form.reasons.other")}</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium">{t("form.fields.details")}</span>
                <textarea
                  name="details"
                  rows={4}
                  required
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <label className="md:col-span-2 flex items-start gap-3">
                <input
                  name="confirmOwnership"
                  type="checkbox"
                  required
                  className="mt-0.5 h-5 w-5 shrink-0 accent-blue-600"
                />
                <span className="text-sm text-gray-700">{t("form.fields.confirmOwnership")}</span>
              </label>

              <label className="md:col-span-2 flex items-start gap-3">
                <input
                  name="confirmDataLoss"
                  type="checkbox"
                  required
                  className="mt-0.5 h-5 w-5 shrink-0 accent-blue-600"
                />
                <span className="text-sm text-gray-700">{t("form.fields.confirmDataLoss")}</span>
              </label>

              <label className="md:col-span-2 flex items-start gap-3">
                <input
                  name="confirmExtraValidation"
                  type="checkbox"
                  required
                  className="mt-0.5 h-5 w-5 shrink-0 accent-blue-600"
                />
                <span className="text-sm text-gray-700">{t("form.fields.confirmExtraValidation")}</span>
              </label>

              <div className="md:col-span-2 mt-2">
                <button
                  type="submit"
                  className="bg-blue-dark hover:bg-blue-normal rounded-full px-8 py-3 font-bold text-white transition"
                >
                  {t("form.submit")}
                </button>
                <p className="mt-3 text-sm text-gray-600">{t("form.disclaimer")}</p>
              </div>
            </form>
          </div>

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

          <p className="mt-8">{t("form.support")}</p>
        </section>
      </main>

      <Footer copy={copy} locale={locale} />
    </>
  );
}
