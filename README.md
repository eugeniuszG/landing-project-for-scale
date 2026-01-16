# Szablon Landing Page

Konfigurowalny szablon landing page w Next.js z **5 stylami motywów** i **komponentami dostosowanymi do motywu**.

## Funkcje

- **5 szablonów stylów**: Minimal, Premium Dark, Bold Conversion, Warm Organic, Editorial
- **Motywy CSS Variables**: kolory, typografia, odstępy, cienie, zaokrąglenia
- **Warianty Hero**: Split, Fullwidth, Form-focused, Story, Gallery
- **Niezależny od klienta**: łatwa personalizacja dla każdej firmy
- **Przełącznik motywów**: wbudowany UI do wyboru motywu

## Szybki start

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) aby zobaczyć szablon.

## Przewodnik konfiguracji dla klienta

### 1. Konfiguracja strony (`app/lib/siteConfig.ts`)

Zaktualizuj dane firmy, kontakt, linki społecznościowe i nawigację:

```typescript
export const siteConfig = {
  businessName: "Nazwa Twojej Firmy",
  tagline: "Twój slogan",
  phone: "+48 123 456 789",
  email: "kontakt@twojafirma.pl",
  address: {
    street: "ul. Przykładowa 123",
    city: "Warszawa",
    region: "Mazowieckie",
    postalCode: "00-000",
    country: "PL",
  },
  social: {
    facebook: "https://facebook.com/twojafirma",
    instagram: "https://instagram.com/twojafirma",
  },
  // ... więcej opcji
};
```

### 2. Wybór motywu (`app/lib/themes.ts`)

Wybierz z 5 wbudowanych motywów lub dostosuj:

| Motyw | Styl | Wariant Hero |
|-------|------|--------------|
| `minimal` | Czysty, skandynawski | Split layout |
| `premium-dark` | Luksusowy, ciemny | Fullwidth background |
| `bold-conversion` | Wysoki kontrast, CTA | Form-first |
| `warm-organic` | Ciepły, organiczny | Story-driven |
| `editorial` | Galeria, magazyn | Photo gallery |

### 3. Personalizacja treści

Zaktualizuj treść w tych plikach:
- `app/page.tsx` - treść Hero, usługi
- `app/components/FAQSection.tsx` - pytania FAQ
- `app/components/Testimonials.tsx` - opinie klientów
- `app/components/PortfolioSection.tsx` - projekty portfolio

### 4. Zasoby graficzne

Zamień placeholder w `/public/assets/`:
- `logo.png` - logo firmy
- `hero-image.svg` - obraz sekcji Hero
- `project-*.svg` - obrazy projektów

## System motywów

### Zmienne CSS

Motywy używają zmiennych CSS zdefiniowanych w `globals.css`:

```css
--color-bg-primary      /* tło główne */
--color-bg-secondary    /* tło drugorzędne */
--color-text-primary    /* tekst główny */
--color-text-secondary  /* tekst drugorzędny */
--color-accent          /* kolor akcentu */
--radius                /* zaokrąglenie */
--shadow-md             /* cień */
```

### Dodawanie własnych motywów

1. Dodaj konfigurację motywu w `app/lib/themes.ts`
2. Zdefiniuj zmienne CSS dla kolorów, typografii, efektów
3. Ustaw `heroVariant` dla układu Hero

## Wdrożenie

### Vercel (zalecane)

```bash
vercel
```

### Zmienne środowiskowe

Ustaw `CANONICAL_HOST` dla przekierowań domeny (opcjonalnie):

```
CANONICAL_HOST=twojadomena.pl
```

## Struktura plików

```
app/
├── components/
│   ├── Hero/           # Warianty układu Hero
│   ├── ThemeSwitcher   # UI wyboru motywu
│   ├── FAQSection      # Komponent FAQ
│   ├── Testimonials    # Komponent opinii
│   └── PortfolioSection # Siatka portfolio
├── lib/
│   ├── siteConfig.ts   # Konfiguracja firmy
│   ├── themes.ts       # Definicje motywów
│   └── ThemeContext.tsx # Zarządzanie stanem motywu
└── globals.css         # Zmienne CSS i narzędzia
```

## Licencja

MIT
