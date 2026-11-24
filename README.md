# Residencial Alêro — Landing Page de Alta Conversão

Landing page **Single Property Showcase** construída em **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + Embla Carousel**, focada na venda direta das 2 casas geminadas prontas no Bairro Barragem, Rio do Sul (SC).

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## Variáveis de ambiente opcionais (`.env.local`)

```env
NEXT_PUBLIC_SITE_URL=https://residencialalero.com.br
NEXT_PUBLIC_META_PIXEL_ID=
```

- Google Analytics (`G-H0PLTNLJTS`) já está configurado no `src/app/layout.tsx`.
- Todos os cliques em WhatsApp e envio do simulador disparam `trackEvent` (`Lead`, `Contact`, `InitiateCheckout`, `ViewContent`) para Meta Pixel e GA4.
