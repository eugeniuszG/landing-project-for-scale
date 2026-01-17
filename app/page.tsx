'use client';

import Hero from './components/Hero';
import { FullWidthSection } from './components/fullWidthSection';
import ThemeSwitcher from './components/ThemeSwitcher';
import FAQSection from './components/FAQSection';
import { ContactFormSwitcher } from './components/forms';
import HostingOptions from './components/HostingOptions';
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
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            To może być Twoja strona!
          </h2>
          <p 
            className="text-center text-lg mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Profesjonalna strona szybciej i taniej niż w agencji
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Service Card 1 - Basic */}
            <div className="p-6 card-theme flex flex-col">
              {/* Savings Badge */}
              <div 
                className="inline-block self-start px-3 py-1 text-xs font-bold mb-4 rounded-full"
                style={{ 
                  backgroundColor: 'var(--color-success, #22c55e)',
                  color: '#fff',
                }}
                title="Widełki rynkowe na podstawie publicznych cenników"
              >
                Do ~81% taniej niż agencja
              </div>
              
              <div 
                className="text-4xl font-bold mb-1"
                style={{ color: 'var(--color-accent)' }}
              >
                1299 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Start w 3 dni
              </div>
              <p 
                className="text-sm mb-4"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Jednostronicowy landing
              </p>
              
              {/* Bullets */}
              <ul className="text-left text-sm space-y-2 mb-6 flex-grow" style={{ color: 'var(--color-text-secondary)' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Idealny na szybkie pozyskanie zapytań
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  1 strona (scroll) + jasny CTA
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Sekcje: oferta, realizacje, FAQ, kontakt
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Podstawowe SEO (meta, nagłówki)
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Szybki i responsywny
                </li>
              </ul>
              
              {/* Agency comparison */}
              <div 
                className="text-xs p-3 mb-4 rounded"
                style={{ 
                  backgroundColor: 'var(--color-bg-accent)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <strong>Agencje:</strong> ~3 000–7 000 zł + 7–10 dni roboczych<br/>
                <strong>U mnie:</strong> od 1299 zł i start w 3 dni
              </div>
              
              <a 
                href="/#kontakt" 
                className="inline-block px-6 py-3 btn-accent text-center w-full"
              >
                Zamów start w 3 dni
              </a>
            </div>
            
            {/* Service Card 2 - Popular */}
            <div 
              className="p-6 card-theme flex flex-col relative"
              style={{ border: '2px solid var(--color-accent)' }}
            >
              {/* Popular Badge */}
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
              
              {/* Savings Badge */}
              <div 
                className="inline-block self-start px-3 py-1 text-xs font-bold mb-4 mt-2 rounded-full"
                style={{ 
                  backgroundColor: 'var(--color-success, #22c55e)',
                  color: '#fff',
                }}
                title="Widełki rynkowe na podstawie publicznych cenników"
              >
                Do ~64% taniej niż agencja
              </div>
              
              <div 
                className="text-4xl font-bold mb-1"
                style={{ color: 'var(--color-accent)' }}
              >
                2899 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Start w 7 dni
              </div>
              <p 
                className="text-sm mb-4"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Landing + dodatkowe sekcje/strony
              </p>
              
              {/* Bullets */}
              <ul className="text-left text-sm space-y-2 mb-6 flex-grow" style={{ color: 'var(--color-text-secondary)' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  <strong>Najlepszy stosunek cena/efekt</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Landing + 2–3 podstrony (usługi, cennik)
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Opinie, gwarancja, mini-case studies
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  FAQ rozbudowane pod SEO
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Lepsza struktura pod Google
                </li>
              </ul>
              
              {/* Agency comparison */}
              <div 
                className="text-xs p-3 mb-4 rounded"
                style={{ 
                  backgroundColor: 'var(--color-bg-accent)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <strong>Agencje:</strong> ~5 000–8 000 zł + dłuższy czas<br/>
                <strong>U mnie:</strong> 2899 zł i start w 7 dni
              </div>
              
              <a 
                href="/#kontakt" 
                className="inline-block px-6 py-3 btn-accent text-center w-full"
              >
                Wybieram pakiet Popularny
              </a>
            </div>
            
            {/* Service Card 3 - PRO */}
            <div className="p-6 card-theme flex flex-col">
              {/* PRO Badge */}
              <div 
                className="inline-block self-start px-3 py-1 text-xs font-bold mb-4 rounded-full"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-text-on-accent)',
                }}
              >
                PRO
              </div>
              
              <div 
                className="text-4xl font-bold mb-1"
                style={{ color: 'var(--color-accent)' }}
              >
                3599 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Start w 11 dni
              </div>
              <p 
                className="text-sm mb-4"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Wielostronicowa + mocniejsze SEO
              </p>
              
              {/* Bullets */}
              <ul className="text-left text-sm space-y-2 mb-6 flex-grow" style={{ color: 'var(--color-text-secondary)' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  <strong>Pod SEO lokalne + skalowanie</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  5–8 podstron (usługi, dzielnice, portfolio)
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Rozbudowane portfolio + filtrowanie
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Techniczne SEO + architektura treści
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Zoptymalizowana szybkość (Core Web Vitals)
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  Przygotowanie pod blog/poradniki
                </li>
              </ul>
              
              {/* Agency comparison */}
              <div 
                className="text-xs p-3 mb-4 rounded"
                style={{ 
                  backgroundColor: 'var(--color-bg-accent)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <strong>Agencje:</strong> często ~14–21 dni roboczych i kilka–kilkanaście tys.<br/>
                <strong>U mnie:</strong> 3599 zł i start w 11 dni
              </div>
              
              <a 
                href="/#kontakt" 
                className="inline-block px-6 py-3 btn-accent text-center w-full"
              >
                Biorę pakiet PRO
              </a>
            </div>
          </div>
          
          {/* Trust Strip */}
          <div 
            className="flex flex-wrap justify-center gap-6 text-sm mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-accent)' }}>⚡</span>
              Szybki start: 3–11 dni
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-accent)' }}>🚀</span>
              Szybkie ładowanie = lepsze pozycje w Google
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-accent)' }}>✓</span>
              Bez abonamentu – strona na własność
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-accent)' }}>📞</span>
              Nastawione na zapytania: CTA + portfolio + FAQ
            </div>
          </div>
          
          {/* Disclaimer */}
          <p 
            className="text-center text-xs max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            * Wszystkie ceny są cenami netto. Porównanie do stawek rynkowych na podstawie publicznych cenników i artykułów branżowych; finalna wycena zależy od zakresu.
          </p>
          
          {/* Hosting Options Dropdown */}
          <HostingOptions />
        </div>
      </FullWidthSection>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Contact Form Section - Demo for clients */}
      <FullWidthSection className="bg-theme-secondary">
        <div id="kontakt" className="container mx-auto py-16 px-4">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Formularz kontaktowy dla Twoich klientów
          </h2>
          <p 
            className="text-lg mb-4 max-w-2xl mx-auto text-center"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Wybierz jaki formularz ma być na Twojej stronie
          </p>
          <p 
            className="text-sm mb-12 max-w-2xl mx-auto text-center"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Każde zapytanie trafia prosto na Twój email lub telefon
          </p>
          
          <ContactFormSwitcher defaultForm="quote" showSwitcher={true} />
          
          {/* Info about contact data */}
          <div className="mt-12 text-center">
            <p 
              className="text-sm mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Na docelowej stronie pokażą się Twoje dane kontaktowe:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold border-2 rounded-lg opacity-60"
                style={{ 
                  borderColor: 'var(--color-accent)',
                  color: 'var(--color-accent)',
                }}
              >
                📞 Twój telefon
              </div>
              <div 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold border-2 rounded-lg opacity-60"
                style={{ 
                  borderColor: 'var(--color-accent)',
                  color: 'var(--color-accent)',
                }}
              >
                ✉️ Twój email
              </div>
            </div>
          </div>
        </div>
      </FullWidthSection>
    </div>
  );
}
