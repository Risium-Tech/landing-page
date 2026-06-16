"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheckIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { clearSession, getSession, saveSession, type AuthSession } from "@/utils/auth";
import LoginView from "./LoginView";
import DonationFlow from "./DonationFlow";

export default function DonationsClient({ locale }: { locale: string }) {
  const t = useTranslations("donations");
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setReady(true);
  }, []);

  function handleAuthenticated(next: AuthSession) {
    saveSession(next);
    setSession(next);
  }

  function handleLogout() {
    clearSession();
    setSession(null);
  }

  return (
    <main className="min-h-screen bg-[#F4F8F6]">
      {/* Header institucional */}
      <header className="bg-gradient-to-br from-[#0F3E31] to-[#0E5F45] px-6 py-10 text-white">
        <div className="mx-auto max-w-xl">
          <span className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#B7D9CB]">
            {t("hero_badge")}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-9">{t("hero_title")}</h1>
          <p className="mt-3 text-base leading-6 text-[#D6E9E0]">{t("hero_description")}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge icon={<ShieldCheckIcon className="h-4 w-4" />} label={t("trust_secure")} />
            <Badge label={t("trust_institutional")} />
            <Badge label={t("availability_brazil")} />
          </div>

          {session && (
            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3">
              <span className="text-sm text-[#D6E9E0]">
                {t("login_logged_as")} <strong className="text-white">{session.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/25"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                {t("login_logout")}
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-8">
        {!ready ? (
          <div className="py-20">
            <span className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-[#1AAF74] border-t-transparent" />
          </div>
        ) : session ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <DonationFlow />
          </motion.div>
        ) : (
          <LoginView locale={locale} onAuthenticated={handleAuthenticated} />
        )}
      </div>
    </main>
  );
}

function Badge({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#E4F3EC]">
      {icon}
      {label}
    </span>
  );
}
