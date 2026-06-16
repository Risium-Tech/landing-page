# Prompt — Página de Doação no site (upconnections-app.com)

> Cole o bloco abaixo num agente de código rodando dentro de `landing-page/`.
> Ele descreve a tela de doação que deve consumir **o mesmo endpoint** já usado pelo app mobile.

---

## ⚠️ Decisão obrigatória antes de começar

O endpoint de doação (`POST /api/v1/app/donations`) é **autenticado**: ele usa o `userId` extraído do JWT
(`GetUserId()`), vincula a doação ao usuário e salva o CPF no perfil dele. A landing-page hoje **não tem login**.

Escolha uma das opções (e ajuste o prompt de acordo):

1. **Reaproveitar o login do app no site** — adicionar tela de login que chama o mesmo fluxo de auth
   (JWT + 2FA) e guarda o `accessToken`. A página de doação só aparece para usuário logado.
2. **Criar um endpoint público de doação no backend** (ex.: `POST /api/v1/app/donations/guest`) que aceite
   nome/email/CPF no corpo e não exija JWT. (Requer mudança no backend — fora do escopo deste prompt.)

O prompt abaixo assume a **opção 1** (usuário autenticado, header `Authorization: Bearer <token>`).

---

## PROMPT (copiar a partir daqui)

Crie uma página de doação em `app/[locale]/donations/page.tsx` no projeto `landing-page`
(Next.js 15 App Router + next-intl + Tailwind + Framer Motion). Ela deve replicar o fluxo de doação
do app mobile e consumir **exatamente os mesmos endpoints** da API.

### Stack e convenções do projeto
- next-intl com rotas `app/[locale]/`. Locales suportados: `pt`, `pt-pt`, `en`, `es`.
  Siga o padrão das páginas existentes (`app/[locale]/privacy-policy`, `terms-conditions`,
  `account-cancellation-policy`).
- Strings ficam em `messages/{en,es,pt,pt-pt}.json`. Crie a chave raiz `"donations"` com todos os textos.
- Tailwind. Cor primária verde `#1AAF74` (variações usadas no app: `#0E5F45`, `#148357`, `#0F3E31`).
- Framer Motion para transições suaves (igual às outras seções).

### Base da API
- Base URL: `https://api.upconnections-app.com/api/v1/app`
- Todas as chamadas exigem header `Authorization: Bearer <accessToken>` (ver Decisão acima).
- `Content-Type: application/json`.

### Endpoints (contrato — não alterar nomes de campos)

**1) Criar doação — `POST /donations`**

Request body (`CreateDonationRequest`):
```jsonc
{
  "amount": 50.00,            // decimal, > 0 e <= 50000
  "message": "texto",          // opcional, máx 500 caracteres
  "isAnonymous": false,        // bool
  "paymentMethod": "pix",      // "pix" | "credit_card"

  // Campos abaixo SÓ quando paymentMethod = "credit_card":
  "cardHolderName": "Fulano de Tal",
  "cardNumber": "4111111111111111",   // 13 a 19 dígitos
  "cardExpiryMonth": "12",            // 1 a 2 dígitos
  "cardExpiryYear": "2030",           // 4 dígitos
  "cardCvv": "123",                   // 3 a 4 dígitos
  "cardHolderCpfCnpj": "12345678900", // obrigatório no cartão
  "cardHolderPhone": "11999999999",   // opcional
  "cardHolderPostalCode": "01001000", // opcional
  "cardHolderAddressNumber": "100"    // opcional
}
```
> Observação para PIX: o CPF do pagador (`cardHolderCpfCnpj`) é necessário se o usuário ainda não tem CPF
> no perfil. Envie sempre o CPF no PIX para evitar erro "CPF é obrigatório para pagamentos via PIX".

Response (`DonationDto`):
```jsonc
{
  "id": "guid",
  "amount": 50.0,
  "message": "texto",
  "isAnonymous": false,
  "paymentMethod": "pix",
  "status": "pending",               // ver enum abaixo
  "cardLastFourDigits": "1111",      // só cartão
  "cardBrand": "VISA",               // só cartão
  "createdAt": "2026-05-22T12:00:00Z",
  "confirmedAt": null
}
```

**2) Obter QR Code PIX — `GET /donations/pix/{donationId}/qrcode`**

Response (`DonationPixDto`):
```jsonc
{
  "donationId": "guid",
  "encodedImage": "<base64 do PNG do QR>",  // exibir com src="data:image/png;base64,<encodedImage>"
  "payload": "<código copia e cola>",
  "expirationDate": "2026-05-22T12:30:00Z"
}
```

**3) Consultar status — `GET /donations/{donationId}/status`**

Response (`DonationStatusDto`):
```jsonc
{ "id": "guid", "status": "confirmed" }
```

### Enum de status (`status`)
`pending` | `confirmed` | `received` | `failed` | `refunded` | `cancelled`
- Sucesso = `confirmed` ou `received`.
- Falha = `failed`.

### Fluxo da tela (replicar o do mobile)

1. **Seleção de valor**: chips de atalho `[10, 25, 50, 100, 250]` (R$) + input livre com máscara de moeda BRL.
2. **Mensagem opcional** (textarea, máx 500 chars, contador de caracteres restantes).
3. **Toggle "Doação anônima"** (`isAnonymous`).
4. **Método de pagamento**: cartões selecionáveis "PIX" e "Cartão de crédito".
   - Se **PIX**: pedir CPF do pagador (validar 11 dígitos).
   - Se **Cartão**: formulário com número, titular, CPF/CNPJ, mês/ano de validade, CVV
     (+ opcionais telefone, CEP, número do endereço).
5. **Submit**:
   - **PIX** → `POST /donations` (paymentMethod `pix`) → com o `id`, chamar
     `GET /donations/pix/{id}/qrcode` → exibir QR (imagem base64) + código copia-e-cola (botão copiar)
     → fazer **polling** de `GET /donations/{id}/status` a cada **5s**; ao virar `confirmed`/`received`
     → tela de sucesso; ao virar `failed` → tela de erro. Limpar o polling ao sair da página.
   - **Cartão** → `POST /donations` (paymentMethod `credit_card`); se `status === "failed"` → erro,
     senão → sucesso. (Cartão geralmente confirma na hora.)
6. **Resultado**: tela de sucesso/erro com botão de voltar ao início.

### Validações (espelhar o backend para feedback imediato)
- `amount` > 0 e <= 50000.
- `message` <= 500 chars.
- Cartão: número 13–19 dígitos, mês 1–2 dígitos, ano 4 dígitos, CVV 3–4 dígitos, CPF/CNPJ obrigatório.
- Mostrar a mensagem de erro vinda da API em `error.response.data.message` quando houver.

### i18n
- A página é aberta pelo app via `https://upconnections-app.com/{locale}/donations`,
  onde `{locale}` é `pt`, `en` ou `es` (mapeado a partir do idioma do app). Garanta que essas três
  rotas funcionem (e `pt-pt`, que o site também suporta).
- Todos os textos via `useTranslations("donations")`. Nada hardcoded.

### Layout/estilo
- Header verde com badge institucional, valor selecionado em destaque, selos de confiança
  ("Pagamento protegido", "Disponível apenas no Brasil por enquanto").
- Cards arredondados (`rounded-[28px]`), bordas suaves, sombra leve — visual coerente com o resto do site.
- Responsivo (mobile-first).

### Arquivos a criar
- `app/[locale]/donations/page.tsx` (server) + componente client com o fluxo (`"use client"`).
- `utils/donations.ts` (ou similar) com as 3 funções de API tipadas (`createDonation`, `getPixQrCode`,
  `getDonationStatus`) usando `fetch` com o header `Authorization`.
- Entradas `"donations"` em cada `messages/*.json`.

Não invente outros endpoints. Use apenas os três acima.

## (fim do prompt)
