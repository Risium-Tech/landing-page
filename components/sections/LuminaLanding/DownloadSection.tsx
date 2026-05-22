import type { LandingCopy } from "./shared";
import { FloatingPhones, Reveal, StoreButtons } from "./shared";

export default function DownloadSection({ copy }: { copy: LandingCopy }) {
  return (
    <section id="download" className="content-auto-section relative overflow-hidden py-32">
      <div className="bg-hero absolute inset-0" />
      <FloatingPhones count={14} />
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <Reveal className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="text-gradient text-4xl leading-[1.05] font-bold md:text-6xl lg:text-7xl">
          {copy.download.title}
        </h2>
        <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-xl">{copy.download.text}</p>
        <p className="text-primary mt-4 text-2xl">{copy.download.line}</p>
        <div className="mt-10">
          <StoreButtons copy={copy} />
        </div>
      </Reveal>
    </section>
  );
}
