"use client";

import Image from "next/image";

interface FeedbackCardProps {
  name: string;
  role: string;
  feedback: string;
  avatar: string;
  altAvatar: string;
  quoteBgAlt: string;
  quoteIconAlt: string;
}

export default function FeedbackCard({
  name,
  role,
  feedback,
  avatar,
  altAvatar,
  quoteBgAlt,
  quoteIconAlt,
}: FeedbackCardProps) {
  return (
    <div className="border-yellow-normal relative rounded-xl border bg-white px-6 py-20 shadow-md">
      {/* Ícone aspas */}
      <div className="absolute -top-4 -left-4">
        <Image src="/svg/quote-bg.svg" alt={quoteBgAlt} width={64} height={64} />
        <Image
          src="/svg/marks-icon.svg"
          alt={quoteIconAlt}
          width={20}
          height={20}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-20 w-20 rounded-full">
          <Image src={avatar} alt={altAvatar} width={70} height={70} className="rounded-full" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{name}</p>
          <p className="text-md text-gray-600">{role}</p>
        </div>
      </div>

      {/* Texto */}
      <p className="text-md leading-relaxed text-gray-700">{feedback}</p>
    </div>
  );
}
