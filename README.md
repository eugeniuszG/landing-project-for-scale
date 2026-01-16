# Landing Page Template

A customizable Next.js landing page template with **5 style themes** and **theme-aware components**.

## Features

- **5 Style Templates**: Minimal, Premium Dark, Bold Conversion, Warm Organic, Editorial
- **CSS Variables Theming**: Colors, typography, spacing, shadows, border radius
- **Hero Layout Variants**: Split, Fullwidth, Form-focused, Story, Gallery
- **Client-Agnostic**: Easy to customize for any business
- **Theme Switcher**: Built-in UI for theme selection

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the template.

## Customization Guide

### 1. Site Configuration (`app/lib/siteConfig.ts`)

Update business info, contact details, social links, and navigation:

```typescript
export const siteConfig = {
  businessName: "Your Business Name",
  tagline: "Your Tagline",
  phone: "+1 234 567 890",
  email: "hello@yourbusiness.com",
  // ... more options
};
```

### 2. Theme Selection (`app/lib/themes.ts`)

Choose from 5 built-in themes or customize:

| Theme | Style | Hero Variant |
|-------|-------|--------------|
| `minimal` | Clean, Scandinavian | Split layout |
| `premium-dark` | Luxury, Marble | Fullwidth background |
| `bold-conversion` | High-contrast, CTA-focused | Form-first |
| `warm-organic` | Earthy, Handcrafted | Story-driven |
| `editorial` | Gallery-first, Magazine | Photo gallery |

### 3. Content Customization

Update content in these files:
- `app/page.tsx` - Hero content, services
- `app/components/FAQSection.tsx` - FAQ items
- `app/components/Testimonials.tsx` - Client reviews
- `app/components/PortfolioSection.tsx` - Portfolio items

### 4. Assets

Replace placeholder images in `/public/assets/`:
- `logo.png` - Your logo
- `hero-image.jpg` - Hero section image
- `portfolio/` - Project images

## Theme System

### CSS Variables

Themes use CSS variables defined in `globals.css`:

```css
--color-bg-primary
--color-bg-secondary
--color-text-primary
--color-text-secondary
--color-accent
--radius
--shadow-md
/* ... and more */
```

### Adding Custom Themes

1. Add theme config in `app/lib/themes.ts`
2. Define CSS variables for colors, typography, effects
3. Set `heroVariant` for the Hero layout

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Environment Variables

Set `CANONICAL_HOST` for domain redirects (optional):

```
CANONICAL_HOST=yourdomain.com
```

## File Structure

```
app/
├── components/
│   ├── Hero/           # Hero layout variants
│   ├── ThemeSwitcher   # Theme selection UI
│   ├── FAQSection      # FAQ component
│   ├── Testimonials    # Reviews component
│   └── PortfolioSection # Portfolio grid
├── lib/
│   ├── siteConfig.ts   # Business configuration
│   ├── themes.ts       # Theme definitions
│   └── ThemeContext.tsx # Theme state management
└── globals.css         # CSS variables & utilities
```

## License

MIT
