/**
 * Site Configuration - Client-agnostic content management
 * Replace these values for each client deployment
 */

export interface SiteConfig {
  // Business Info
  businessName: string;
  tagline: string;
  description: string;
  
  // Contact
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  
  // Social Media
  social: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
    linkedin?: string;
    twitter?: string;
  };
  
  // SEO
  siteUrl: string;
  locale: string;
  keywords: string[];
  
  // Branding
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  
  // Business Details
  priceRange?: string;
  openingHours?: {
    days: string[];
    opens: string;
    closes: string;
  };
  
  // Navigation
  navLinks: {
    href: string;
    label: string;
  }[];
  
  // Footer Links
  footerLinks: {
    href: string;
    label: string;
  }[];
}

// Default placeholder config - replace for each client
export const siteConfig: SiteConfig = {
  businessName: "Nazwa Firmy",
  tagline: "Twój przekonujący slogan",
  description: "Profesjonalne usługi dostosowane do Twoich potrzeb. Skontaktuj się, aby uzyskać bezpłatną wycenę.",
  
  phone: "+48 000 000 000",
  email: "contact@yourdomain.com",
  address: {
    street: "ul. Przykładowa 123",
    city: "Warszawa",
    region: "Mazowieckie",
    postalCode: "00-000",
    country: "PL",
  },
  
  social: {
    facebook: "https://facebook.com/yourbusiness",
    instagram: "https://instagram.com/yourbusiness",
    telegram: "https://t.me/your_username",
    whatsapp: "https://wa.me/48000000000",
  },
  
  siteUrl: "https://yourdomain.com",
  locale: "pl_PL",
  keywords: ["usługi", "profesjonalne", "jakość"],
  
  logo: {
    src: "/assets/logo.svg",
    alt: "Logo firmy",
    width: 40,
    height: 40,
  },
  
  priceRange: "Skontaktuj się po wycenę",
  openingHours: {
    days: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"],
    opens: "08:00",
    closes: "18:00",
  },
  
  navLinks: [
    { href: "/", label: "Strona główna" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#uslugi", label: "Usługi" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#kontakt", label: "Kontakt" },
  ],
  
  footerLinks: [
    { href: "/", label: "Strona główna" },
    { href: "/#uslugi", label: "Usługi" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#kontakt", label: "Kontakt" },
  ],
};
