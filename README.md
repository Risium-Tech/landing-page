# Up Mosaicos — Landing Page

Landing page institucional do Up Mosaicos com internacionalização, animações e design responsivo.

## Stack

- **Next.js 15** com App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **next-intl** para internacionalização (pt-BR, en)
- **Framer Motion** para animações de entrada
- **Lenis** para smooth scrolling
- **Keen Slider** para carrossel de depoimentos
- **Heroicons** para ícones
- **Docker** com build multi-stage (Node Alpine)

## Estrutura

```
├── app/
│   └── [locale]/                      # Roteamento dinâmico por idioma
│       ├── page.tsx                   # Página principal
│       ├── privacy-policy/            # Política de privacidade
│       ├── terms-conditions/          # Termos de uso
│       ├── account-cancellation-policy/ # Política de cancelamento
│       └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx                 # Navegação com troca de idioma
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroBanner/               # Banner principal com CTA
│   │   ├── About/                     # Sobre o projeto
│   │   ├── HowWorks/                 # Como funciona (step cards)
│   │   ├── Benefits/                  # Benefícios
│   │   ├── Feedback/                  # Depoimentos (carrossel)
│   │   ├── DownloadBanner/           # Banner de download
│   │   └── InspirationText/          # Texto inspiracional
│   ├── ui/                            # GradientButton, FeedbackCard, StepCard
│   └── providers/
│       └── LenisProvider.tsx          # Provider de smooth scrolling
├── i18n/                              # Configuração next-intl
├── messages/                          # Arquivos de tradução
├── middleware.ts                      # Middleware de internacionalização
└── public/                            # Assets estáticos
```

## Seções da Página

1. **Hero Banner** — banner full-viewport com background e CTA de download
2. **About** — sobre a plataforma
3. **How Works** — cards com etapas de uso
4. **Benefits** — vantagens para fãs e organizadores
5. **Inspiration Text** — frase de impacto
6. **Feedback** — carrossel de depoimentos (Keen Slider)
7. **Download Banner** — links para App Store e Google Play

Navegação por âncoras com smooth scroll: `#home`, `#about`, `#how`, `#benefits`, `#feedbacks`

## Instalação

### Pré-requisitos

- Node.js 18+
- Yarn

### Desenvolvimento local

```bash
# Instalar dependências
yarn install

# Rodar em desenvolvimento
yarn dev
```

### Docker

```bash
docker build -t mosaic-landing .
docker run -p 3000:3000 mosaic-landing
```

---

Desenvolvido por **JaoDev**
