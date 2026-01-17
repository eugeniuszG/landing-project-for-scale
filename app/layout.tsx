import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ContactButtons from "./components/TelegramButton";
import CookieBanner from "./components/CookieConsent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';
import { verificationMeta } from "./lib/verification";
import { ThemeProvider } from "./lib/ThemeContext";
import { siteConfig } from "./lib/siteConfig";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: `${siteConfig.businessName} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    images: [
      {
        url: "/assets/og-image.svg",
        width: 1200,
        height: 630,
        alt: siteConfig.businessName,
      },
    ],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/assets/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: verificationMeta,
};

const businessId = `${siteConfig.siteUrl}/#business`;

const businessAddress = {
  "@type": "PostalAddress",
  "streetAddress": siteConfig.address.street,
  "addressLocality": siteConfig.address.city,
  "addressRegion": siteConfig.address.region,
  "postalCode": siteConfig.address.postalCode,
  "addressCountry": siteConfig.address.country
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": businessId,
  "name": siteConfig.businessName,
  "image": `${siteConfig.siteUrl}${siteConfig.logo.src}`,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteConfig.siteUrl}${siteConfig.logo.src}`,
    "width": siteConfig.logo.width,
    "height": siteConfig.logo.height
  },
  "address": businessAddress,
  "url": siteConfig.siteUrl,
  "telephone": siteConfig.phone,
  "priceRange": siteConfig.priceRange,
  "openingHoursSpecification": siteConfig.openingHours ? [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": siteConfig.openingHours.days,
      "opens": siteConfig.openingHours.opens,
      "closes": siteConfig.openingHours.closes
    }
  ] : [],
  "description": siteConfig.description,
  "sameAs": Object.values(siteConfig.social).filter(Boolean)
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.siteUrl}/#website`,
  "url": siteConfig.siteUrl,
  "name": siteConfig.businessName,
  "publisher": {
    "@id": businessId
  },
  "inLanguage": siteConfig.locale.replace('_', '-')
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = siteConfig.locale.split('_')[0];
  
  return (
    <html lang={lang}>
      <head>
        <link rel="preload" href={siteConfig.logo.src} as="image" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="preconnect" href="https://vercel.live" crossOrigin="anonymous" />
        
        {/* Google Fonts - for premium themes (Playfair Display, Lora, etc.) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Libre+Franklin:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Favicon - PNG fallback for browsers that don't support SVG */}
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <ThemeProvider>
          <div className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
            <Navbar />
            <main className="min-h-screen bg-theme-primary">
              {children}
              <SpeedInsights />
              <Analytics />
            </main>
            <Footer />
            <ContactButtons />
            <CookieBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
