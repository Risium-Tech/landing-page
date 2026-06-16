import { API_BASE_URL, getAccessToken } from "./auth";

export type PaymentMethod = "pix" | "credit_card";

export type DonationStatus =
  | "pending"
  | "confirmed"
  | "received"
  | "failed"
  | "refunded"
  | "cancelled";

export interface CreateDonationPayload {
  amount: number;
  message?: string;
  isAnonymous: boolean;
  paymentMethod: PaymentMethod;
  cardHolderName?: string;
  cardNumber?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  cardCvv?: string;
  cardHolderCpfCnpj?: string;
  cardHolderPhone?: string;
  cardHolderPostalCode?: string;
  cardHolderAddressNumber?: string;
}

export interface DonationResponse {
  id: string;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  paymentMethod: string;
  status: DonationStatus;
  cardLastFourDigits?: string;
  cardBrand?: string;
  createdAt: string;
  confirmedAt?: string | null;
}

export interface PixQrCodeResponse {
  donationId: string;
  encodedImage: string;
  payload: string;
  expirationDate: string;
}

export interface DonationStatusResponse {
  id: string;
  status: DonationStatus;
}

/** Erro com a mensagem já extraída do corpo da API (campo `error`/`message`). */
export class DonationApiError extends Error {}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const record = (data ?? {}) as Record<string, unknown>;
    const message =
      (typeof record.error === "string" && record.error) ||
      (typeof record.message === "string" && record.message) ||
      "Não foi possível concluir a operação.";
    throw new DonationApiError(message);
  }

  return data as T;
}

export function createDonation(
  payload: CreateDonationPayload,
): Promise<DonationResponse> {
  return request<DonationResponse>("/donations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getPixQrCode(donationId: string): Promise<PixQrCodeResponse> {
  return request<PixQrCodeResponse>(`/donations/pix/${donationId}/qrcode`);
}

export function getDonationStatus(
  donationId: string,
): Promise<DonationStatusResponse> {
  return request<DonationStatusResponse>(`/donations/${donationId}/status`);
}

export function isDonationConfirmed(status: DonationStatus): boolean {
  return status === "confirmed" || status === "received";
}

// --- Formatação / máscaras (espelham o app mobile) ---

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isFinite(value) ? value : 0);
}

/** Recebe o texto digitado e devolve "1.234,56" tratando os dígitos como centavos. */
export function maskCurrencyInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const value = Number(digits) / 100;
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseCurrencyInput(masked: string): number {
  const digits = masked.replace(/\D/g, "");
  if (!digits) return 0;
  return Number(digits) / 100;
}

export function maskCpf(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

export function maskCep(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function onlyDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}
