import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function scrollToSection(
  id: string,
  locale: string,
  pathname: string,
  router: AppRouterInstance
) {
  const offset = -80;
  const landingPath = `/${locale}`;

  const isOnLanding = pathname === landingPath || pathname === `${landingPath}/`;

  if (!isOnLanding) {
    router.push(`${landingPath}/${id}`);
    return;
  }

  const el = document.querySelector(id);
  if (!el) return;

  const lenis = (window as any).lenis;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;

  if (lenis) {
    lenis.scrollTo(top);
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}
