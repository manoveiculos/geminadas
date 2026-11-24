import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { PROPERTY } from '@/lib/property-data';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://residencialalero.com.br';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAFAFA',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Residencial Alêro | Casas Geminadas Prontas no Bairro Barragem — Rio do Sul',
  description:
    '2 casas geminadas prontas para morar de 75,87m² no Bairro Barragem, Rio do Sul (SC). 1 suíte + 1 dormitório, porcelanato, 100% fora de enchente e fundos para área de preservação. A partir de R$ 395.000. Aceita FGTS e carro na troca.',
  keywords: [
    'casa geminada Rio do Sul',
    'Residencial Alêro',
    'casa Bairro Barragem Rio do Sul',
    'casa fora de enchente Rio do Sul',
    'imóvel pronto para financiar Rio do Sul',
    'casa aceita carro na troca Rio do Sul',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Residencial Alêro',
    title: 'Residencial Alêro — Casas Geminadas Prontas em Rio do Sul | R$ 395.000',
    description:
      'Prontas para morar e 100% fora de enchente no Bairro Barragem. 75,87m², 1 suíte + 1 dormitório, porcelanato e fundos para mata preservada. Aceita financiamento, FGTS e carro na troca.',
    images: [
      {
        url: '/images/fachada-principal.jpg',
        width: 1200,
        height: 630,
        alt: 'Fachada real das casas geminadas prontas do Residencial Alêro no Bairro Barragem em Rio do Sul',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residencial Alêro — Casas Geminadas Prontas no Bairro Barragem, Rio do Sul',
    description:
      '2 unidades exclusivas de 75,87m², 100% fora de enchente, prontas para financiar. A partir de R$ 395.000.',
    images: ['/images/fachada-principal.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#FAFAFA] text-[#111827] antialiased selection:bg-emerald-700/15 selection:text-emerald-900">
        {/* Google Analytics 4 (Preservado do site oficial) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${PROPERTY.gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${PROPERTY.gaMeasurementId}');
          `}
        </Script>

        {/* Meta Pixel (Ativado automaticamente ao definir NEXT_PUBLIC_META_PIXEL_ID) */}
        {META_PIXEL_ID ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}

        {children}
      </body>
    </html>
  );
}
