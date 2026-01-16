/**
 * Theme Definitions - 5 Style Templates
 * Each theme defines CSS variables for colors, typography, spacing, and effects
 */

export type ThemeId = 'minimal' | 'premium-dark' | 'bold-conversion' | 'warm-organic' | 'editorial';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  heroVariant: 'split' | 'fullwidth' | 'form-focused' | 'story' | 'gallery';
  colors: {
    // Backgrounds
    bgPrimary: string;
    bgSecondary: string;
    bgAccent: string;
    bgCard: string;
    bgOverlay: string;
    
    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textOnAccent: string;
    
    // Accents & Actions
    accent: string;
    accentHover: string;
    accentLight: string;
    
    // Borders & Dividers
    border: string;
    borderLight: string;
    
    // Status
    success: string;
    error: string;
    warning: string;
  };
  typography: {
    fontFamily: string;
    fontFamilyHeading: string;
    headingWeight: string;
    bodyWeight: string;
  };
  spacing: {
    borderRadius: string;
    borderRadiusLg: string;
    borderRadiusFull: string;
  };
  effects: {
    shadow: string;
    shadowLg: string;
    shadowCard: string;
  };
}

export const themes: Record<ThemeId, ThemeConfig> = {
  // Template A — "Minimal / Scandinavian"
  'minimal': {
    id: 'minimal',
    name: 'Minimal Scandinavian',
    description: 'Clean, calm design with lots of whitespace. Perfect for mainstream clients.',
    heroVariant: 'split',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8f9fa',
      bgAccent: '#f1f3f4',
      bgCard: '#ffffff',
      bgOverlay: 'rgba(0, 0, 0, 0.4)',
      
      textPrimary: '#1a1a1a',
      textSecondary: '#4a4a4a',
      textMuted: '#8a8a8a',
      textOnAccent: '#ffffff',
      
      accent: '#2d3436',
      accentHover: '#636e72',
      accentLight: '#dfe6e9',
      
      border: '#e0e0e0',
      borderLight: '#f0f0f0',
      
      success: '#00b894',
      error: '#d63031',
      warning: '#fdcb6e',
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      fontFamilyHeading: "'Inter', system-ui, -apple-system, sans-serif",
      headingWeight: '600',
      bodyWeight: '400',
    },
    spacing: {
      borderRadius: '4px',
      borderRadiusLg: '8px',
      borderRadiusFull: '9999px',
    },
    effects: {
      shadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      shadowLg: '0 4px 12px rgba(0, 0, 0, 0.1)',
      shadowCard: '0 2px 8px rgba(0, 0, 0, 0.06)',
    },
  },

  // Template B — "Premium Dark / Marble"
  'premium-dark': {
    id: 'premium-dark',
    name: 'Premium Dark',
    description: 'Dark, luxurious design with glass effects. For premium-budget clients.',
    heroVariant: 'fullwidth',
    colors: {
      bgPrimary: '#0a0a0a',
      bgSecondary: '#141414',
      bgAccent: '#1a1a1a',
      bgCard: 'rgba(255, 255, 255, 0.05)',
      bgOverlay: 'rgba(0, 0, 0, 0.7)',
      
      textPrimary: '#ffffff',
      textSecondary: '#c9c9c9',
      textMuted: '#888888',
      textOnAccent: '#0a0a0a',
      
      accent: '#c9a962',
      accentHover: '#d4b978',
      accentLight: 'rgba(201, 169, 98, 0.15)',
      
      border: 'rgba(255, 255, 255, 0.1)',
      borderLight: 'rgba(255, 255, 255, 0.05)',
      
      success: '#4ade80',
      error: '#f87171',
      warning: '#fbbf24',
    },
    typography: {
      fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
      fontFamilyHeading: "'Playfair Display', Georgia, serif",
      headingWeight: '500',
      bodyWeight: '300',
    },
    spacing: {
      borderRadius: '2px',
      borderRadiusLg: '4px',
      borderRadiusFull: '9999px',
    },
    effects: {
      shadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      shadowLg: '0 8px 40px rgba(0, 0, 0, 0.5)',
      shadowCard: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    },
  },

  // Template C — "Bold Conversion / High-contrast"
  'bold-conversion': {
    id: 'bold-conversion',
    name: 'Bold Conversion',
    description: 'High-contrast design focused on lead generation. Form-first approach.',
    heroVariant: 'form-focused',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f7f7f7',
      bgAccent: '#1e3a5f',
      bgCard: '#ffffff',
      bgOverlay: 'rgba(30, 58, 95, 0.9)',
      
      textPrimary: '#1a1a1a',
      textSecondary: '#4a4a4a',
      textMuted: '#717171',
      textOnAccent: '#ffffff',
      
      accent: '#e63946',
      accentHover: '#c1121f',
      accentLight: '#ffeef0',
      
      border: '#e5e5e5',
      borderLight: '#f0f0f0',
      
      success: '#2a9d8f',
      error: '#e63946',
      warning: '#f4a261',
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      fontFamilyHeading: "'Inter', system-ui, -apple-system, sans-serif",
      headingWeight: '800',
      bodyWeight: '400',
    },
    spacing: {
      borderRadius: '8px',
      borderRadiusLg: '12px',
      borderRadiusFull: '9999px',
    },
    effects: {
      shadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
      shadowLg: '0 8px 32px rgba(0, 0, 0, 0.16)',
      shadowCard: '0 4px 16px rgba(0, 0, 0, 0.1)',
    },
  },

  // Template D — "Warm / Organic"
  'warm-organic': {
    id: 'warm-organic',
    name: 'Warm Organic',
    description: 'Cozy, friendly design with warm tones. Great for family-oriented services.',
    heroVariant: 'story',
    colors: {
      bgPrimary: '#faf8f5',
      bgSecondary: '#f5f0e8',
      bgAccent: '#e8dfd3',
      bgCard: '#ffffff',
      bgOverlay: 'rgba(89, 63, 41, 0.6)',
      
      textPrimary: '#3d3226',
      textSecondary: '#5c4d3d',
      textMuted: '#8b7d6b',
      textOnAccent: '#ffffff',
      
      accent: '#b5654a',
      accentHover: '#9a5540',
      accentLight: '#f9ebe5',
      
      border: '#e0d5c7',
      borderLight: '#f0e8dc',
      
      success: '#6b8e4e',
      error: '#c1574a',
      warning: '#d4a357',
    },
    typography: {
      fontFamily: "'Source Sans Pro', system-ui, -apple-system, sans-serif",
      fontFamilyHeading: "'Lora', Georgia, serif",
      headingWeight: '600',
      bodyWeight: '400',
    },
    spacing: {
      borderRadius: '12px',
      borderRadiusLg: '20px',
      borderRadiusFull: '9999px',
    },
    effects: {
      shadow: '0 2px 8px rgba(89, 63, 41, 0.08)',
      shadowLg: '0 8px 24px rgba(89, 63, 41, 0.12)',
      shadowCard: '0 4px 16px rgba(89, 63, 41, 0.08)',
    },
  },

  // Template E — "Editorial / Gallery-first"
  'editorial': {
    id: 'editorial',
    name: 'Editorial Gallery',
    description: 'Magazine-style design with large photos. Perfect when portfolio sells.',
    heroVariant: 'gallery',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#fafafa',
      bgAccent: '#f5f5f5',
      bgCard: '#ffffff',
      bgOverlay: 'rgba(0, 0, 0, 0.5)',
      
      textPrimary: '#111111',
      textSecondary: '#333333',
      textMuted: '#666666',
      textOnAccent: '#ffffff',
      
      accent: '#111111',
      accentHover: '#333333',
      accentLight: '#f0f0f0',
      
      border: '#e8e8e8',
      borderLight: '#f5f5f5',
      
      success: '#22c55e',
      error: '#ef4444',
      warning: '#eab308',
    },
    typography: {
      fontFamily: "'Libre Franklin', system-ui, -apple-system, sans-serif",
      fontFamilyHeading: "'Playfair Display', Georgia, serif",
      headingWeight: '700',
      bodyWeight: '400',
    },
    spacing: {
      borderRadius: '0px',
      borderRadiusLg: '0px',
      borderRadiusFull: '9999px',
    },
    effects: {
      shadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      shadowLg: '0 4px 16px rgba(0, 0, 0, 0.08)',
      shadowCard: '0 2px 8px rgba(0, 0, 0, 0.04)',
    },
  },
};

export const defaultTheme: ThemeId = 'minimal';

export function getTheme(id: ThemeId): ThemeConfig {
  return themes[id] || themes[defaultTheme];
}

export function getAllThemes(): ThemeConfig[] {
  return Object.values(themes);
}
