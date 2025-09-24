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

export const generateMetadata = async (context: { params: { locale: string } }) => {
  const { params } = context;

  return generateSeoMetadata({
    locale: params.locale,
    namespace: "HomePage",
  });
};

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <>
      <Header />
      <HeroBanner />
      <About />
      <HowWorks />
      <Benefits />
      <InspirationText text={t("inspiration.text")} alt={t("inspiration.alt")} />
      <Feedback />
      <DownloadBanner />
      <Footer />
    </>
  );
}
