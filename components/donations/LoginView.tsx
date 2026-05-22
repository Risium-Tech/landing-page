"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LockClosedIcon, EnvelopeIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import {
  loginWithApple,
  loginWithEmail,
  loginWithGoogle,
  TwoFactorRequiredError,
  APPLE_REDIRECT_URI,
  APPLE_SERVICE_ID,
  GOOGLE_WEB_CLIENT_ID,
  type AuthSession,
} from "@/utils/auth";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (el: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
    AppleID?: {
      auth: {
        init: (config: Record<string, unknown>) => void;
        signIn: () => Promise<{
          authorization: { id_token: string };
          user?: { name?: { firstName?: string; lastName?: string } };
        }>;
      };
    };
  }
}

const GOOGLE_LOCALES: Record<string, string> = {
  pt: "pt_BR",
  "pt-pt": "pt_PT",
  en: "en",
  es: "es",
};

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    document.body.appendChild(script);
  });
}

export default function LoginView({
  locale,
  onAuthenticated,
}: {
  locale: string;
  onAuthenticated: (session: AuthSession) => void;
}) {
  const t = useTranslations("donations");

  const [mode, setMode] = useState<"credentials" | "twofactor">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Google Identity Services
  useEffect(() => {
    if (!GOOGLE_WEB_CLIENT_ID) return;
    let cancelled = false;

    loadScript("https://accounts.google.com/gsi/client", "google-gsi")
      .then(() => {
        if (cancelled || !window.google || !googleButtonRef.current) return;
        window.google.accounts.id.initialize({
          client_id: GOOGLE_WEB_CLIENT_ID,
          callback: async (response: { credential?: string }) => {
            if (!response.credential) return;
            await handleSocialLogin(() => loginWithGoogle(response.credential!));
          },
        });
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
          width: 320,
          locale: GOOGLE_LOCALES[locale] ?? "pt_BR",
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Sign in with Apple JS
  useEffect(() => {
    if (!APPLE_SERVICE_ID) return;
    loadScript(
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
      "apple-auth",
    )
      .then(() => {
        window.AppleID?.auth.init({
          clientId: APPLE_SERVICE_ID,
          scope: "name email",
          redirectURI: APPLE_REDIRECT_URI || window.location.href,
          usePopup: true,
        });
      })
      .catch(() => {});
  }, []);

  async function handleSocialLogin(action: () => Promise<AuthSession>) {
    setError(null);
    setSocialLoading(true);
    try {
      const session = await action();
      onAuthenticated(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("login_error_generic"));
    } finally {
      setSocialLoading(false);
    }
  }

  async function handleAppleLogin() {
    if (!window.AppleID) return;
    setError(null);
    setSocialLoading(true);
    try {
      const data = await window.AppleID.auth.signIn();
      const session = await loginWithApple(
        data.authorization.id_token,
        data.user?.name?.firstName,
        data.user?.name?.lastName,
      );
      onAuthenticated(session);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      // Usuário cancelou o popup da Apple — não tratar como erro.
      if (message && !message.toLowerCase().includes("cancel")) {
        setError(message);
      }
    } finally {
      setSocialLoading(false);
    }
  }

  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const session = await loginWithEmail(email.trim(), password);
      onAuthenticated(session);
    } catch (err) {
      if (err instanceof TwoFactorRequiredError) {
        setMode("twofactor");
      } else {
        setError(err instanceof Error ? err.message : t("login_error_credentials"));
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleTwoFactorSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length < 6) return;
    setError(null);
    setLoading(true);
    try {
      const session = await loginWithEmail(email.trim(), password, otp);
      onAuthenticated(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("login_error_generic"));
    } finally {
      setLoading(false);
    }
  }

  if (mode === "twofactor") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md rounded-[28px] border border-[#DCECE5] bg-white p-7 shadow-sm"
      >
        <div className="mb-5 flex flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-[#F0F8F4] p-3">
            <ShieldCheckIcon className="h-7 w-7 text-[#148357]" />
          </span>
          <h2 className="text-2xl font-bold text-[#123B2E]">{t("login_2fa_title")}</h2>
          <p className="text-sm leading-6 text-gray-500">{t("login_2fa_description")}</p>
        </div>

        <form onSubmit={handleTwoFactorSubmit} className="flex flex-col gap-4">
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder={t("login_2fa_placeholder")}
            className="w-full rounded-2xl border border-[#D9E4DF] bg-[#F8FBF9] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#123B2E] outline-none focus:border-[#1AAF74]"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={otp.length < 6 || loading}
            className="w-full rounded-2xl bg-[#1AAF74] py-4 text-base font-semibold text-white transition hover:bg-[#148357] disabled:opacity-50"
          >
            {loading ? t("processing") : t("login_2fa_submit")}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("credentials");
              setOtp("");
              setError(null);
            }}
            className="text-sm font-medium text-[#285F4A]"
          >
            {t("login_2fa_back")}
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md rounded-[28px] border border-[#DCECE5] bg-white p-7 shadow-sm"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-[#123B2E]">{t("login_title")}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">{t("login_subtitle")}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div ref={googleButtonRef} className="flex min-h-[44px] justify-center" />

        {APPLE_SERVICE_ID && (
          <button
            type="button"
            onClick={handleAppleLogin}
            disabled={socialLoading}
            className="flex w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            <svg viewBox="0 0 384 512" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            {t("login_apple")}
          </button>
        )}
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#D9E8E0]" />
        <span className="text-sm font-medium text-[#6B7F76]">{t("login_or")}</span>
        <span className="h-px flex-1 bg-[#D9E8E0]" />
      </div>

      <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">{t("login_email_label")}</span>
          <div className="flex items-center gap-2 rounded-2xl border border-[#D9E4DF] bg-[#F8FBF9] px-4">
            <EnvelopeIcon className="h-5 w-5 text-[#5E7C6E]" />
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("login_email_placeholder")}
              className="w-full bg-transparent py-3.5 text-base text-[#123B2E] outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">{t("login_password_label")}</span>
          <div className="flex items-center gap-2 rounded-2xl border border-[#D9E4DF] bg-[#F8FBF9] px-4">
            <LockClosedIcon className="h-5 w-5 text-[#5E7C6E]" />
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("login_password_placeholder")}
              className="w-full bg-transparent py-3.5 text-base text-[#123B2E] outline-none"
            />
          </div>
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="mt-1 w-full rounded-2xl bg-[#1AAF74] py-4 text-base font-semibold text-white transition hover:bg-[#148357] disabled:opacity-50"
        >
          {loading ? t("processing") : t("login_submit")}
        </button>
      </form>
    </motion.div>
  );
}
