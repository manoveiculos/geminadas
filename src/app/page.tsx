import React from 'react';
import { LandingPageClient } from '@/components/LandingPageClient';
import { PROPERTY } from '@/lib/property-data';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: `${PROPERTY.name} — Casas Geminadas Prontas`,
    description:
      '2 casas geminadas prontas para morar de 75,87m² no Bairro Barragem em Rio do Sul (SC), 100% fora de enchente, 1 suíte + 1 dormitório e fundos para área de preservação.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Antônio Tonon',
      addressLocality: 'Rio do Sul',
      addressRegion: 'SC',
      postalCode: PROPERTY.cep,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: PROPERTY.coordinates.lat,
      longitude: PROPERTY.coordinates.lng,
    },
    numberOfRooms: 2,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: 75.87,
      unitCode: 'MTK',
    },
    offers: {
      '@type': 'Offer',
      price: PROPERTY.price,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageClient />
    </>
  );
}
