// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import { LenisProvider } from '@/components/LenisProvider';
import { SchemaMarkup } from './schema';

export const metadata: Metadata = {
  title: 'Rutina Perfecta - Generador de Rutinas de Fitness Personalizado',
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
    title: 'Rutina Perfecta - Tu Rutina Personalizada en 2 Minutos',
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
    title: 'Rutina Perfecta - Generador de Fitness',
    description: 'Crea tu rutina personalizada en minutos',
  },
  alternates: {
    canonical: 'https://rutinaperfecta.com',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Crea tu rutina de fitness personalizada en minutos con IA. 100% gratis." />
        <meta name="keywords" content="rutinas fitness, generador de rutinas, entrenamiento personalizado" />
        <meta name="author" content="Rutina Perfecta" />
        
        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💪</text></svg>" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to Google services */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* Schema Markup */}
        <SchemaMarkup />
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
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
