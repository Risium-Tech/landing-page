"use client";

import DownloadSection from "./DownloadSection";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import ImmersiveSection from "./ImmersiveSection";
import MosaicsSection from "./MosaicsSection";
import SocialSection from "./SocialSection";
import SponsorsSection from "./SponsorsSection";
import TechnologySection from "./TechnologySection";
import { MotionProvider, type LandingCopy } from "./shared";

export default function LuminaLanding({ copy }: { copy: LandingCopy }) {
  return (
    <MotionProvider>
      <main className="bg-background min-h-screen">
        <HeroSection copy={copy} />
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-30 -my-10 h-20 overflow-hidden"
        >
          <div
            className="via-background/70 absolute inset-0 bg-gradient-to-b from-transparent to-transparent backdrop-blur-lg"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            }}
          />
          <div className="bg-primary/10 absolute inset-x-[20%] top-1/2 h-8 -translate-y-1/2 rounded-full blur-3xl" />
        </div>
        <ImmersiveSection copy={copy} />
        <HowItWorksSection copy={copy} />
        <MosaicsSection copy={copy} />
        <SocialSection copy={copy} />
        <SponsorsSection copy={copy} />
        <TechnologySection copy={copy} />
        <DownloadSection copy={copy} />
      </main>
    </MotionProvider>
  );
}
