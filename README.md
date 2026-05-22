# Up Connections Landing Page

Landing page institucional do Up Connections com internacionalizacao, visual responsivo e secoes modulares.

## Stack

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- next-intl para rotas por idioma
- Lenis para smooth scrolling
- Heroicons para icones
- Docker com build multi-stage

## Estrutura

```text
app/
  [locale]/
    page.tsx
    privacy-policy/
    terms-conditions/
    account-cancellation-policy/
components/
  layout/
    Header.tsx
    Footer.tsx
  sections/
    LuminaLanding/
      LuminaLanding.tsx
      HeroSection.tsx
      ImmersiveSection.tsx
      HowItWorksSection.tsx
      MosaicsSection.tsx
      SocialSection.tsx
      SponsorsSection.tsx
      TechnologySection.tsx
      DownloadSection.tsx
      shared.tsx
  providers/
    LenisProvider.tsx
i18n/
messages/
utils/
  landingCopy.ts
```

## Secoes da Home

1. Hero
2. Experiencias imersivas
3. Como funciona
4. Mosaicos visuais
5. Experiencia social
6. Marcas e patrocinadores
7. Tecnologia
8. Download

## Desenvolvimento

```bash
yarn install
yarn dev
```

## Docker

```bash
docker build -t up-connections-landing .
docker run -p 3000:3000 up-connections-landing
```
