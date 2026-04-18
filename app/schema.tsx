// app/schema.tsx
export function SchemaMarkup() {
  const schemas = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Rutina Perfecta",
      "url": "https://www.rutinaperfecta.com",
      "logo": "https://www.rutinaperfecta.com/logo.png",
      "description": "Generador de rutinas de fitness personalizado con IA",
      "contact": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "rutinaperfecta00@gmail.com"
      }
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://www.rutinaperfecta.com",
      "name": "Rutina Perfecta",
      "description": "Crea tu rutina de fitness personalizada en minutos",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.rutinaperfecta.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    software: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Rutina Perfecta",
      "description": "Generador de rutinas de fitness con IA",
      "applicationCategory": "HealthApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1000",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.website),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.software),
        }}
      />
    </>
  );
}
