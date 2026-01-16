'use client';

import Hero from './components/Hero';
import { FullWidthSection } from './components/fullWidthSection';
import ThemeSwitcher from './components/ThemeSwitcher';
import FAQSection from './components/FAQSection';
import { siteConfig } from './lib/siteConfig';

// Treść strony - dostosuj dla klienta
const heroContent = {
  title: "Profesjonalne usługi dopasowane do Twoich potrzeb",
  subtitle: "Jakość, terminowość, w budżecie. Uzyskaj bezpłatną wycenę już dziś.",
  ctaText: "Bezpłatna wycena",
  ctaHref: "/#kontakt",
  heroImage: "/assets/hero-image.svg",
  backgroundImage: "/assets/hero-bg.svg",
  bulletPoints: [
    "Bezpłatna konsultacja i wycena",
    "Doświadczeni specjaliści",
    "Gwarancja jakości",
  ],
  badges: [
    { icon: "✓", text: "Licencja i ubezpieczenie" },
    { icon: "⭐", text: "Opinie 5 gwiazdek" },
    { icon: "🏆", text: "10+ lat doświadczenia" },
  ],
  features: [
    { value: "500+", label: "Zrealizowanych projektów" },
    { value: "98%", label: "Zadowolonych klientów" },
    { value: "10+", label: "Lat doświadczenia" },
  ],
  story: "Jesteśmy zespołem oddanych profesjonalistów, którzy dostarczają wyjątkowe rezultaty. Z ponad dziesięcioletnim doświadczeniem pomogłiśmy setkom klientów osiągnąć ich cele.",
  steps: [
    { number: "1", title: "Kontakt", description: "Skontaktuj się po bezpłatną konsultację" },
    { number: "2", title: "Wycena", description: "Otrzymaj szczegółową wycenę" },
    { number: "3", title: "Planowanie", description: "Tworzymy plan projektu" },
    { number: "4", title: "Realizacja", description: "Profesjonalne wykonanie" },
    { number: "5", title: "Odbiór", description: "Jakościowe rezultaty na czas" },
  ],
  projects: [
    { image: "/assets/project-1.svg", title: "Projekt 1", category: "Kategoria" },
    { image: "/assets/project-2.svg", title: "Projekt 2", category: "Kategoria" },
    { image: "/assets/project-3.svg", title: "Projekt 3", category: "Kategoria" },
    { image: "/assets/project-4.svg", title: "Projekt 4", category: "Kategoria" },
    { image: "/assets/project-5.svg", title: "Projekt 5", category: "Kategoria" },
    { image: "/assets/project-6.svg", title: "Projekt 6", category: "Kategoria" },
  ],
};

export default function Home() {
  return (
    <div>
      {/* Theme Switcher Demo - Remove in production */}
      <div 
        className="fixed bottom-4 right-4 z-50 p-4 max-w-sm"
        style={{ 
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <ThemeSwitcher showLabels={false} />
      </div>
      
      {/* Hero Section - automatically uses theme's hero variant */}
      <Hero {...heroContent} />
      
      {/* Services/Pricing Section */}
      <FullWidthSection className="bg-theme-secondary">
        <div className="container mx-auto py-16 px-4">
          <h2 
            id="uslugi"
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: 'var(--color-text-primary)' }}
          >
            To może być Twoja strona!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div 
              className="p-8 text-center card-theme"
            >
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                1299 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Start w 3 dni
              </div>
              <p 
                className="text-sm mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Jednostronicowy landing, szybka realizacja
              </p>
              <a 
                href="/#kontakt" 
                className="inline-block px-6 py-3 btn-accent"
              >
                Zamów
              </a>
            </div>
            
            {/* Service Card 2 - Featured */}
            <div 
              className="p-8 text-center card-theme relative"
              style={{ 
                border: '2px solid var(--color-accent)',
              }}
            >
              <div 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-text-on-accent)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Popularny
              </div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                2899 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Start w 7 dni
              </div>
              <p 
                className="text-sm mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Landing + dodatkowe sekcje/strony
              </p>
              <a 
                href="/#kontakt" 
                className="inline-block px-6 py-3 btn-accent"
              >
                Zamów
              </a>
            </div>
            
            {/* Service Card 3 */}
            <div 
              className="p-8 text-center card-theme"
            >
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                3599 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Start w 11 dni
              </div>
              <p 
                className="text-sm mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Wielostronicowa + mocniejsze SEO
              </p>
              <a 
                href="/#kontakt" 
                className="inline-block px-6 py-3 btn-accent"
              >
                Zamów
              </a>
            </div>
          </div>
        </div>
      </FullWidthSection>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Contact CTA */}
      <FullWidthSection className="bg-theme-accent">
        <div id="kontakt" className="container mx-auto py-16 px-4 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Gotowy, aby zacząć?
          </h2>
          <p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Skontaktuj się z nami już dziś po bezpłatną konsultację i wycenę. Pomożemy Ci osiągnąć Twoje cele.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="inline-block px-8 py-4 text-lg font-semibold btn-accent"
            >
              Napisz do nas
            </a>
            <a 
              href={`tel:${siteConfig.phone}`}
              className="inline-block px-8 py-4 text-lg font-semibold border-2 transition-colors"
              style={{ 
                borderColor: 'var(--color-accent)',
                color: 'var(--color-accent)',
                borderRadius: 'var(--radius)',
              }}
            >
              Zadzwoń teraz
            </a>
          </div>
        </div>
      </FullWidthSection>
    </div>
  );
}
