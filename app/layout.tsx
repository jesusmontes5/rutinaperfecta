// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import { LenisProvider } from '@/components/LenisProvider';
import { SchemaMarkup } from './schema';

export const metadata: Metadata = {
  title: 'Generador de Rutinas Personalizadas - Fitness IA',
  description:
    'Crea tu rutina de fitness personalizada en minutos con IA. Generador de rutinas inteligente, 100% gratis, totalmente personalizable y adaptado a tu nivel.',
  keywords: [
    'rutinas fitness',
    'generador de rutinas',
    'entrenamiento personalizado',
    'gym',
    'fitness',
    'rutina 3 días',
    'rutina 4 días',
    'rutina 5 días',
    'ejercicios en casa',
    'ganancia muscular',
    'pérdida de grasa',
  ],
  authors: [{ name: 'Rutina Perfecta' }],
  creator: 'Rutina Perfecta',
  publisher: 'Rutina Perfecta',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Generador de Rutinas Personalizadas - Fitness IA',
    description: 'Crea tu rutina de fitness personalizada con IA. 100% gratis, sin suscripciones. Descarga en PDF.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://rutinaperfecta.com',
    siteName: 'Rutina Perfecta',
    images: [
      {
        url: 'https://rutinaperfecta.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rutina Perfecta - Generador de Fitness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Rutinas Personalizadas - Fitness IA',
    description: 'Crea tu rutina personalizada en minutos',
  },
  alternates: {
    canonical: 'https://rutinaperfecta.com',
  },
  verification: {
    google: 'XRcgIUp-HIJ8ET-vUVtRiA2UT6_E5TS9zl64IZxPT0E',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="apple-mobile-web-app-title" content="Rutina Perfecta" />
        
        {/* Additional Mobile Optimizations */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="x-ua-compatible" content="IE=edge" />
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Crea tu rutina de fitness personalizada en minutos con IA. 100% gratis." />
        <meta name="keywords" content="rutinas fitness, generador de rutinas, entrenamiento personalizado" />
        <meta name="author" content="Rutina Perfecta" />
        
        {/* Favicon & Icons */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to Google services */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Schema Markup */}
        <SchemaMarkup />
        
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7194910562579872"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-white text-gray-900">
        <LenisProvider>
          <LoadingScreen />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3XFRZH1H3Q"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3XFRZH1H3Q');
            `,
          }}
        />
      </body>
    </html>
  );
}
