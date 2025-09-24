import { getTranslations } from "next-intl/server";
import { generateSeoMetadata } from "@/components/SeoMetaData";
import Header from "@/components/layout/Header";
import HeroBanner from "@/components/sections/HeroBanner/HeroBanner";
import About from "@/components/sections/About/About";
import HowWorks from "@/components/sections/HowWorks/HowWorks";
import Benefits from "@/components/sections/Benefits.tsx/Benefits";
import InspirationText from "@/components/sections/InspirationText/InspirationText";
import Feedback from "@/components/sections/Feedback/Feedback";
import DownloadBanner from "@/components/sections/DownloadBanner/DownloadBanner";
import Footer from "@/components/layout/Footer";

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params;

  return generateSeoMetadata({
    locale,
    namespace: "HomePage",
  });
};

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <>
      <Header />

      <main>
        <section id="home">
          <HeroBanner />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="how">
          <HowWorks />
        </section>

        <section id="benefits">
          <Benefits />
        </section>

        <section id="inspiration">
          <InspirationText text={t("inspiration.text")} alt={t("inspiration.alt")} />
        </section>

        <section id="feedbacks">
          <Feedback />
        </section>

        <section id="download">
          <DownloadBanner />
        </section>
      </main>

      <footer id="contact">
        <Footer />
      </footer>
    </>
  );
}
