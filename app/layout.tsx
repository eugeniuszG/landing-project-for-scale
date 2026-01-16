import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import TelegramButton from "./components/TelegramButton";
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
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
            <TelegramButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
