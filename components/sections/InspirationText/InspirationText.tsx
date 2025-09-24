"use client";

import Image from "next/image";

interface InspirationTextProps {
  text: string;
  alt: string;
}

export default function InspirationText({ text, alt }: InspirationTextProps) {
  return (
    <section className="relative w-full bg-[url('/images/inspiration-banner.png')] bg-cover bg-center py-16">
      <div className="mx-auto flex items-center justify-center gap-4 px-4">
        <Image src="/images/ball-icon.png" alt={alt} width={50} height={50} />

        <h2 className="text-yellow-normal text-center text-lg font-bold md:text-4xl">{text}</h2>

        <Image src="/images/ball-icon.png" alt={alt} width={50} height={50} />
      </div>
    </section>
  );
}
