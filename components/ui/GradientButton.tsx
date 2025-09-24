"use client";

import Link from "next/link";
import { ReactNode } from "react";
import classNames from "classnames";

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  as?: "button" | "link";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "yellow" | "blueGreen";
}

export default function GradientButton({
  children,
  href,
  className,
  as = "link",
  type = "button",
  onClick,
  variant = "blueGreen",
}: GradientButtonProps) {
  const variantClass =
    variant === "yellow"
      ? "bg-[image:var(--gradient-yellow)] text-black"
      : "bg-[image:var(--gradient-blue-green)] text-white";

  const baseClass = classNames(
    "inline-block rounded-full px-6 py-3 text-sm font-bold uppercase text-center shadow-md transition-all duration-200",
    variantClass,
    className
  );

  if (as === "button") {
    return (
      <button type={type} className={baseClass} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href || "#"} className={baseClass}>
      {children}
    </Link>
  );
}
