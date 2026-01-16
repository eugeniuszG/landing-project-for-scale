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
  businessName: "Your Business Name",
  tagline: "Your compelling tagline here",
  description: "Professional services tailored to your needs. Contact us for a free quote.",
  
  phone: "+48 000 000 000",
  email: "contact@yourdomain.com",
  address: {
    street: "Street Address 123",
    city: "City",
    region: "Region",
    postalCode: "00-000",
    country: "PL",
  },
  
  social: {
    facebook: "https://facebook.com/yourbusiness",
    instagram: "https://instagram.com/yourbusiness",
  },
  
  siteUrl: "https://yourdomain.com",
  locale: "pl_PL",
  keywords: ["service", "professional", "quality"],
  
  logo: {
    src: "/assets/logo.png",
    alt: "Your Business Logo",
    width: 40,
    height: 40,
  },
  
  priceRange: "Contact for quote",
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  
  footerLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
};
