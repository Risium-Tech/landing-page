export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://api.upconnections-app.com/api/v1/app";

export const GOOGLE_WEB_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
  "854002040962-bohucag6acbru4u102nbbeh8gepv8f90.apps.googleusercontent.com";

export const APPLE_SERVICE_ID = process.env.NEXT_PUBLIC_APPLE_SERVICE_ID ?? "";
export const APPLE_REDIRECT_URI =
  process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI ?? "";

const SESSION_KEY = "auth_user";

export interface AuthSession {
  accessToken: string;
  role: string;
  fullName: string;
  email: string;
}

interface LoginApiResponse extends AuthSession {
  expiresIn: string;
  userName?: string;
}

/** Lançado quando o backend exige o código 2FA de 6 dígitos. */
export class TwoFactorRequiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TwoFactorRequiredError";
  }
}

function readApiError(data: unknown, fallback: string): string {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const message = record.error ?? record.message;
    if (typeof message === "string" && message.length > 0) return message;
  }
  return fallback;
}

const TWO_FACTOR_HINT = "fatores com 6 dígitos";

function toSession(data: LoginApiResponse): AuthSession {
  return {
    accessToken: data.accessToken,
    role: data.role,
    fullName: data.fullName,
    email: data.email,
  };
}

export async function loginWithEmail(
  email: string,
  password: string,
  twoFactorToken?: string,
): Promise<AuthSession> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      ...(twoFactorToken ? { twoFactorToken } : {}),
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = readApiError(data, "Não foi possível entrar.");
    if (message.toLowerCase().includes(TWO_FACTOR_HINT)) {
      throw new TwoFactorRequiredError(message);
    }
    throw new Error(message);
  }

  return toSession(data as LoginApiResponse);
}

export async function loginWithGoogle(idToken: string): Promise<AuthSession> {
  const response = await fetch(`${API_BASE_URL}/auth/login/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(readApiError(data, "Não foi possível entrar com o Google."));
  }

  return toSession(data as LoginApiResponse);
}

export async function loginWithApple(
  identityToken: string,
  firstName?: string,
  lastName?: string,
): Promise<AuthSession> {
  const response = await fetch(`${API_BASE_URL}/auth/login/apple`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identityToken, firstName, lastName }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(readApiError(data, "Não foi possível entrar com a Apple."));
  }

  return toSession(data as LoginApiResponse);
}

export function saveSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthSession;
    return parsed.accessToken ? parsed : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function getAccessToken(): string | null {
  return getSession()?.accessToken ?? null;
}
