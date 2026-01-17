# Hosting statyczny (klasyczny)

Ten przewodnik opisuje jak przygotować stronę do hostingu na klasycznym serwerze (bez serverless).

## Kiedy użyć hostingu statycznego?

- Klient ma już własny hosting u operatora domeny
- Nie chce korzystać z Vercel/Netlify
- Potrzebuje prostego pliku HTML/CSS/JS

## Krok 1: Zmień formularz na Formspree

Formularze kontaktowe wymagają backendu. Dla hostingu statycznego użyj Formspree:

1. Zarejestruj się na [formspree.io](https://formspree.io) (darmowy plan: 50 zgłoszeń/mies.)
2. Utwórz nowy formularz i skopiuj ID (np. `xwkgpqvl`)
3. Użyj komponentu `ContactFormFormspree`:

```tsx
import { ContactFormFormspree } from './components/forms';

// W komponencie kontaktowym:
<ContactFormFormspree formspreeId="xwkgpqvl" />
```

## Krok 2: Skonfiguruj eksport statyczny

W pliku `next.config.mjs` dodaj:

```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ... reszta konfiguracji
};
```

## Krok 3: Zbuduj stronę

```bash
npm run build
```

Pliki statyczne znajdziesz w folderze `out/`.

## Krok 4: Wgraj na hosting

1. Wgraj zawartość folderu `out/` na serwer FTP
2. Ustaw domenę na katalog ze stroną
3. Gotowe!

## Ograniczenia hostingu statycznego

| Funkcja | Vercel/Netlify | Hosting klasyczny |
|---------|----------------|-------------------|
| Formularz kontaktowy | ✅ Wbudowany | ⚠️ Przez Formspree |
| Captcha matematyczna | ✅ Wbudowana | ❌ Niedostępna |
| Optymalizacja obrazów | ✅ Automatyczna | ❌ Ręczna |
| SSL (https) | ✅ Automatyczny | ⚠️ Zależy od hostingu |
| Aktualizacje | ✅ Git push | ⚠️ Ręcznie przez FTP |

## Rekomendacja

Dla większości klientów zalecamy **hosting na Vercel** (darmowy plan):
- Zero konfiguracji
- Automatyczny SSL
- Formularz działa bez zewnętrznych serwisów
- Łatwe aktualizacje

Hosting statyczny to opcja dla klientów, którzy muszą mieć stronę na swoim istniejącym hostingu.
