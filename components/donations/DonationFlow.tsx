"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  QrCodeIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import {
  createDonation,
  getDonationStatus,
  getPixQrCode,
  isDonationConfirmed,
  formatCurrencyBRL,
  maskCardNumber,
  maskCep,
  maskCpf,
  maskCurrencyInput,
  onlyDigits,
  parseCurrencyInput,
  type DonationResponse,
  type PixQrCodeResponse,
  type PaymentMethod,
} from "@/utils/donations";

const QUICK_AMOUNTS = [10, 25, 50, 100, 250];
const MAX_AMOUNT = 50000;
const MAX_MESSAGE = 500;

type Step = "form" | "pix" | "card" | "result";

interface DonationData {
  amount: number;
  message?: string;
  isAnonymous: boolean;
  cpf?: string;
}

export default function DonationFlow() {
  const [step, setStep] = useState<Step>("form");
  const [data, setData] = useState<DonationData | null>(null);
  const [result, setResult] = useState<"success" | "failed">("success");

  function goToPix(d: DonationData) {
    setData(d);
    setStep("pix");
  }
  function goToCard(d: DonationData) {
    setData(d);
    setStep("card");
  }
  function finish(status: "success" | "failed") {
    setResult(status);
    setStep("result");
  }
  function reset() {
    setData(null);
    setStep("form");
  }

  return (
    <div className="w-full max-w-xl">
      <AnimatePresence mode="wait">
        {step === "form" && (
          <FormStep key="form" onPix={goToPix} onCard={goToCard} />
        )}
        {step === "pix" && data && (
          <PixStep key="pix" data={data} onResult={finish} onBack={reset} />
        )}
        {step === "card" && data && (
          <CardStep key="card" data={data} onResult={finish} onBack={reset} />
        )}
        {step === "result" && (
          <ResultStep key="result" status={result} onBack={reset} />
        )}
      </AnimatePresence>
    </div>
  );
}

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function FormStep({
  onPix,
  onCard,
}: {
  onPix: (d: DonationData) => void;
  onCard: (d: DonationData) => void;
}) {
  const t = useTranslations("donations");
  const [amountInput, setAmountInput] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [cpf, setCpf] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const parsedAmount = parseCurrencyInput(amountInput);

  function handleContinue() {
    const next: Record<string, string> = {};
    if (!parsedAmount || parsedAmount <= 0) next.amount = t("error_amount_min");
    else if (parsedAmount > MAX_AMOUNT) next.amount = t("error_amount_max");
    if (message.length > MAX_MESSAGE) next.message = t("error_message_max");
    if (paymentMethod === "pix" && onlyDigits(cpf).length < 11)
      next.cpf = t("error_cpf");

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const base: DonationData = {
      amount: parsedAmount,
      message: message || undefined,
      isAnonymous,
    };

    if (paymentMethod === "pix") onPix({ ...base, cpf: onlyDigits(cpf) });
    else onCard(base);
  }

  return (
    <motion.div {...fade} className="flex flex-col gap-5">
      <section className="rounded-[28px] border border-[#DCECE5] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900">{t("amount_label")}</h3>
        <p className="mt-1 text-sm leading-5 text-gray-600">{t("amount_helper")}</p>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {QUICK_AMOUNTS.map((value) => {
            const active = parsedAmount === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setAmountInput(maskCurrencyInput(String(value * 100)))}
                className={`rounded-2xl border px-3 py-4 text-center text-base font-bold transition ${
                  active
                    ? "border-[#1AAF74] bg-[#E8F7F0] text-[#0E5F45]"
                    : "border-[#D9E4DF] bg-[#F8FBF9] text-gray-700 hover:border-[#1AAF74]/50"
                }`}
              >
                {formatCurrencyBRL(value)}
              </button>
            );
          })}
        </div>

        <label className="mt-4 flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">{t("amount_field_label")}</span>
          <div className="flex items-center gap-1 rounded-2xl border border-[#D9E4DF] bg-[#F8FBF9] px-4">
            <span className="text-lg font-semibold text-gray-500">R$</span>
            <input
              inputMode="numeric"
              value={amountInput}
              onChange={(e) => {
                setAmountInput(maskCurrencyInput(e.target.value));
                setErrors((p) => ({ ...p, amount: "" }));
              }}
              placeholder={t("amount_placeholder")}
              className="w-full bg-transparent py-3.5 text-lg text-[#123B2E] outline-none"
            />
          </div>
          {errors.amount && <span className="text-sm text-red-500">{errors.amount}</span>}
        </label>
      </section>

      <section className="rounded-[28px] border border-[#DCECE5] bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900">{t("message_label")}</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
          placeholder={t("message_placeholder")}
          rows={3}
          className="mt-3 w-full resize-none rounded-2xl border border-[#D9E4DF] bg-[#F8FBF9] px-4 py-3 text-base text-[#123B2E] outline-none focus:border-[#1AAF74]"
        />
        <p className="mt-1 text-right text-xs text-gray-500">
          {t("message_counter", { count: MAX_MESSAGE - message.length })}
        </p>
      </section>

      <section className="rounded-[28px] border border-[#DCECE5] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900">{t("method_title")}</h3>
        <p className="mt-1 text-sm leading-5 text-gray-600">{t("method_helper")}</p>

        <div className="mt-4 flex flex-col gap-3">
          <MethodCard
            icon={<QrCodeIcon className="h-6 w-6" />}
            title={t("method_pix")}
            description={t("method_pix_description")}
            selected={paymentMethod === "pix"}
            onClick={() => setPaymentMethod("pix")}
          />
          <MethodCard
            icon={<CreditCardIcon className="h-6 w-6" />}
            title={t("method_card")}
            description={t("method_card_description")}
            selected={paymentMethod === "credit_card"}
            onClick={() => setPaymentMethod("credit_card")}
          />
        </div>

        {paymentMethod === "pix" && (
          <label className="mt-4 flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-700">{t("pix_cpf_label")}</span>
            <input
              inputMode="numeric"
              value={cpf}
              onChange={(e) => {
                setCpf(maskCpf(e.target.value));
                setErrors((p) => ({ ...p, cpf: "" }));
              }}
              placeholder={t("pix_cpf_placeholder")}
              className="rounded-2xl border border-[#D9E4DF] bg-[#F8FBF9] px-4 py-3.5 text-base text-[#123B2E] outline-none focus:border-[#1AAF74]"
            />
            {errors.cpf && <span className="text-sm text-red-500">{errors.cpf}</span>}
          </label>
        )}
      </section>

      <section className="rounded-[28px] border border-[#DCECE5] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4 rounded-2xl bg-[#F7FBF9] px-4 py-4">
          <div className="flex-1">
            <p className="text-base font-semibold text-gray-900">{t("anonymous_toggle")}</p>
            <p className="mt-1 text-sm leading-5 text-gray-600">{t("anonymous_helper")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isAnonymous}
            onClick={() => setIsAnonymous((v) => !v)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition ${
              isAnonymous ? "bg-[#1AAF74]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition ${
                isAnonymous ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#DCECE5] px-4 py-4">
          <LockClosedIcon className="h-5 w-5 shrink-0 text-[#148357]" />
          <p className="text-sm leading-5 text-gray-600">{t("secure_notice")}</p>
        </div>
      </section>

      <button
        type="button"
        onClick={handleContinue}
        className="w-full rounded-2xl bg-[#1AAF74] py-4 text-base font-semibold text-white transition hover:bg-[#148357]"
      >
        {t("continue")}
      </button>
    </motion.div>
  );
}

function MethodCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
        selected ? "border-[#1AAF74] bg-[#E8F7F0]" : "border-[#D9E4DF] bg-[#F8FBF9] hover:border-[#1AAF74]/50"
      }`}
    >
      <span className={`mt-0.5 rounded-full bg-white p-2 ${selected ? "text-[#148357]" : "text-[#5B6B63]"}`}>
        {icon}
      </span>
      <span className="flex-1">
        <span className={`block text-base font-semibold ${selected ? "text-[#0E5F45]" : "text-gray-800"}`}>
          {title}
        </span>
        <span className="mt-1 block text-sm leading-5 text-gray-600">{description}</span>
      </span>
    </button>
  );
}

function PixStep({
  data,
  onResult,
  onBack,
}: {
  data: DonationData;
  onResult: (status: "success" | "failed") => void;
  onBack: () => void;
}) {
  const t = useTranslations("donations");
  const [loading, setLoading] = useState(true);
  const [donation, setDonation] = useState<DonationResponse | null>(null);
  const [pixData, setPixData] = useState<PixQrCodeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const created = await createDonation({
          amount: data.amount,
          message: data.message,
          isAnonymous: data.isAnonymous,
          paymentMethod: "pix",
          cardHolderCpfCnpj: data.cpf,
        });
        if (!active) return;
        setDonation(created);

        const qr = await getPixQrCode(created.id);
        if (!active) return;
        setPixData(qr);

        pollingRef.current = setInterval(async () => {
          try {
            const { status } = await getDonationStatus(created.id);
            if (isDonationConfirmed(status)) {
              if (pollingRef.current) clearInterval(pollingRef.current);
              onResult("success");
            } else if (status === "failed") {
              if (pollingRef.current) clearInterval(pollingRef.current);
              onResult("failed");
            }
          } catch {
            /* tenta novamente no próximo ciclo */
          }
        }, 5000);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : t("error_generic"));
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  async function copyCode() {
    if (!pixData?.payload) return;
    await navigator.clipboard.writeText(pixData.payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <motion.div {...fade} className="flex flex-col items-center gap-4 rounded-[28px] border border-[#DCECE5] bg-white p-12 text-center shadow-sm">
        <Spinner />
        <p className="text-base text-gray-500">{t("pix_loading")}</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div {...fade} className="flex flex-col items-center gap-4 rounded-[28px] border border-[#DCECE5] bg-white p-10 text-center shadow-sm">
        <XCircleIcon className="h-14 w-14 text-red-500" />
        <p className="text-base text-red-500">{error}</p>
        <button onClick={onBack} className="rounded-2xl bg-[#1AAF74] px-8 py-3 font-semibold text-white">
          {t("result_back")}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div {...fade} className="flex flex-col gap-5">
      <div className="rounded-[28px] bg-gradient-to-br from-[#0E5F45] to-[#148357] p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/75">{t("pix_badge")}</p>
        <p className="mt-2 text-3xl font-bold">{formatCurrencyBRL(data.amount)}</p>
        <p className="mt-2 text-sm leading-5 text-white/90">{t("pix_scan_qr")}</p>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3">
          <ShieldCheckIcon className="h-5 w-5" />
          <span className="text-sm">{t("pix_security_helper")}</span>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#DCECE5] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">{t("pix_instruction_title")}</h3>
        <p className="mt-1 text-sm leading-5 text-gray-600">{t("pix_instruction_helper")}</p>

        {pixData?.encodedImage && (
          <div className="mt-5 flex justify-center rounded-[24px] border border-[#DCECE5] bg-[#F8FBF9] p-4">
            <img
              src={`data:image/png;base64,${pixData.encodedImage}`}
              alt="QR Code PIX"
              className="h-60 w-60"
            />
          </div>
        )}

        {pixData?.payload && (
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-700">{t("pix_code_label")}</p>
            <p className="mt-2 break-all rounded-2xl border border-[#D9E4DF] bg-[#F8FBF9] p-4 text-center text-sm text-gray-700">
              {pixData.payload}
            </p>
            <button
              onClick={copyCode}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1AAF74] py-3.5 font-semibold text-white transition hover:bg-[#148357]"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />
              {copied ? t("pix_copied") : t("pix_copy")}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-[28px] border border-[#DCECE5] bg-white p-6 shadow-sm">
        <Spinner small />
        <div className="flex-1">
          <p className="text-base font-semibold text-gray-900">{t("pix_waiting_title")}</p>
          <p className="mt-1 text-sm leading-5 text-gray-600">{t("pix_waiting")}</p>
        </div>
      </div>

      {donation?.id && (
        <p className="text-center text-xs text-gray-400">
          {t("pix_reference_label")}: {donation.id}
        </p>
      )}
    </motion.div>
  );
}

function CardStep({
  data,
  onResult,
  onBack,
}: {
  data: DonationData;
  onResult: (status: "success" | "failed") => void;
  onBack: () => void;
}) {
  const t = useTranslations("donations");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cpf, setCpf] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate() {
    const next: Record<string, string> = {};
    const cleanCard = onlyDigits(cardNumber);
    if (cleanCard.length < 13 || cleanCard.length > 19) next.cardNumber = t("error_card_number");
    if (cardHolderName.trim().length < 3) next.cardHolderName = t("error_card_holder");
    if (onlyDigits(cpf).length < 11) next.cpf = t("error_card_cpf");
    if (expiryMonth.length < 1 || expiryMonth.length > 2) next.expiryMonth = t("error_card_expiry");
    if (expiryYear.length !== 4) next.expiryYear = t("error_card_expiry");
    if (cvv.length < 3 || cvv.length > 4) next.cvv = t("error_card_cvv");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await createDonation({
        amount: data.amount,
        message: data.message,
        isAnonymous: data.isAnonymous,
        paymentMethod: "credit_card",
        cardHolderName: cardHolderName.trim(),
        cardNumber: onlyDigits(cardNumber),
        cardExpiryMonth: expiryMonth,
        cardExpiryYear: expiryYear,
        cardCvv: cvv,
        cardHolderCpfCnpj: onlyDigits(cpf),
        cardHolderPhone: onlyDigits(phone) || undefined,
        cardHolderPostalCode: onlyDigits(postalCode) || undefined,
        cardHolderAddressNumber: addressNumber || undefined,
      });
      onResult(response.status === "failed" ? "failed" : "success");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("error_generic"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form {...fade} onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="rounded-[28px] bg-gradient-to-br from-[#0E5F45] to-[#148357] p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/75">{t("card_security_badge")}</p>
        <p className="mt-2 text-3xl font-bold">{formatCurrencyBRL(data.amount)}</p>
        <p className="mt-2 text-sm leading-5 text-white/90">{t("card_security_description")}</p>
      </div>

      <section className="rounded-[28px] border border-[#DCECE5] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900">{t("card_form_title")}</h3>
        <p className="mt-1 text-sm leading-5 text-gray-600">{t("card_form_helper")}</p>

        <div className="mt-4 flex flex-col gap-4">
          <Field label={t("card_number")} error={errors.cardNumber}>
            <input
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => setCardNumber(maskCardNumber(e.target.value))}
              placeholder="0000 0000 0000 0000"
              className={inputClass}
            />
          </Field>
          <Field label={t("card_holder")} error={errors.cardHolderName}>
            <input
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label={t("card_cpf")} error={errors.cpf}>
            <input
              inputMode="numeric"
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              placeholder="000.000.000-00"
              className={inputClass}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label={t("card_expiry_month")} error={errors.expiryMonth}>
              <input
                inputMode="numeric"
                maxLength={2}
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(onlyDigits(e.target.value).slice(0, 2))}
                placeholder="MM"
                className={inputClass}
              />
            </Field>
            <Field label={t("card_expiry_year")} error={errors.expiryYear}>
              <input
                inputMode="numeric"
                maxLength={4}
                value={expiryYear}
                onChange={(e) => setExpiryYear(onlyDigits(e.target.value).slice(0, 4))}
                placeholder="AAAA"
                className={inputClass}
              />
            </Field>
            <Field label={t("card_cvv")} error={errors.cvv}>
              <input
                inputMode="numeric"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(onlyDigits(e.target.value).slice(0, 4))}
                placeholder="000"
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#DCECE5] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900">{t("card_optional_title")}</h3>
        <p className="mt-1 text-sm leading-5 text-gray-600">{t("card_optional_helper")}</p>

        <div className="mt-4 flex flex-col gap-4">
          <Field label={t("card_phone")}>
            <input
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(onlyDigits(e.target.value))}
              className={inputClass}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("card_postal_code")}>
              <input
                inputMode="numeric"
                value={postalCode}
                onChange={(e) => setPostalCode(maskCep(e.target.value))}
                placeholder="00000-000"
                className={inputClass}
              />
            </Field>
            <Field label={t("card_address_number")}>
              <input
                inputMode="numeric"
                value={addressNumber}
                onChange={(e) => setAddressNumber(onlyDigits(e.target.value))}
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#F7FBF9] px-4 py-4">
          <ShieldCheckIcon className="h-5 w-5 shrink-0 text-[#148357]" />
          <p className="text-sm leading-5 text-gray-600">{t("card_trust_helper")}</p>
        </div>
      </section>

      {submitError && <p className="text-sm text-red-500">{submitError}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl border border-[#D9E4DF] py-4 px-6 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          {t("result_back")}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-2xl bg-[#1AAF74] py-4 text-base font-semibold text-white transition hover:bg-[#148357] disabled:opacity-50"
        >
          {loading ? t("processing") : t("submit_card")}
        </button>
      </div>
    </motion.form>
  );
}

const inputClass =
  "w-full rounded-2xl border border-[#D9E4DF] bg-[#F8FBF9] px-4 py-3.5 text-base text-[#123B2E] outline-none focus:border-[#1AAF74]";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      {children}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
}

function ResultStep({
  status,
  onBack,
}: {
  status: "success" | "failed";
  onBack: () => void;
}) {
  const t = useTranslations("donations");
  const success = status === "success";
  return (
    <motion.div {...fade} className="flex flex-col items-center gap-6 rounded-[28px] border border-[#DCECE5] bg-white p-10 text-center shadow-sm">
      <span className={`rounded-full p-5 ${success ? "bg-[#F0FBF5]" : "bg-red-50"}`}>
        {success ? (
          <CheckCircleIcon className="h-14 w-14 text-[#1AAF74]" />
        ) : (
          <XCircleIcon className="h-14 w-14 text-red-500" />
        )}
      </span>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {success ? t("result_success_title") : t("result_failed_title")}
        </h2>
        <p className="mt-2 text-base leading-6 text-gray-500">
          {success ? t("result_success_message") : t("result_failed_message")}
        </p>
      </div>
      <button
        onClick={onBack}
        className="w-full rounded-2xl bg-[#1AAF74] py-4 font-semibold text-white transition hover:bg-[#148357]"
      >
        {t("result_back")}
      </button>
    </motion.div>
  );
}

function Spinner({ small }: { small?: boolean }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-[#1AAF74] border-t-transparent ${
        small ? "h-5 w-5" : "h-10 w-10"
      }`}
    />
  );
}
