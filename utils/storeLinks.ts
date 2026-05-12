export const APPLE_STORE_URL = "https://apps.apple.com/br/app/up-mosaicos/id6757821931";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.upconnections.mosaics&hl=en";

export type StoreTarget = "ios" | "android" | "desktop";

type DeviceInfo = {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
};

export function identifyStoreTarget({
  userAgent = "",
  platform = "",
  maxTouchPoints = 0,
}: DeviceInfo): StoreTarget {
  const isIOS =
    /iPhone|iPad|iPod/i.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) return "ios";
  if (isAndroid) return "android";

  return "desktop";
}

export function getStoreUrlByNavigator() {
  if (typeof window === "undefined") return PLAY_STORE_URL;

  const target = identifyStoreTarget({
    userAgent: window.navigator.userAgent || window.navigator.vendor || "",
    platform: window.navigator.platform || "",
    maxTouchPoints: window.navigator.maxTouchPoints || 0,
  });

  if (target === "ios") return APPLE_STORE_URL;
  if (target === "android") return PLAY_STORE_URL;

  return PLAY_STORE_URL;
}
