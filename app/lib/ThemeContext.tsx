'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeId, ThemeConfig, themes, defaultTheme, getTheme } from './themes';

interface ThemeContextType {
  theme: ThemeConfig;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeVariables(theme: ThemeConfig) {
  const root = document.documentElement;
  
  // Colors
  root.style.setProperty('--color-bg-primary', theme.colors.bgPrimary);
  root.style.setProperty('--color-bg-secondary', theme.colors.bgSecondary);
  root.style.setProperty('--color-bg-accent', theme.colors.bgAccent);
  root.style.setProperty('--color-bg-card', theme.colors.bgCard);
  root.style.setProperty('--color-bg-overlay', theme.colors.bgOverlay);
  
  root.style.setProperty('--color-text-primary', theme.colors.textPrimary);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--color-text-muted', theme.colors.textMuted);
  root.style.setProperty('--color-text-on-accent', theme.colors.textOnAccent);
  
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-accent-hover', theme.colors.accentHover);
  root.style.setProperty('--color-accent-light', theme.colors.accentLight);
  
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--color-border-light', theme.colors.borderLight);
  
  root.style.setProperty('--color-success', theme.colors.success);
  root.style.setProperty('--color-error', theme.colors.error);
  root.style.setProperty('--color-warning', theme.colors.warning);
  
  // Typography
  root.style.setProperty('--font-family', theme.typography.fontFamily);
  root.style.setProperty('--font-family-heading', theme.typography.fontFamilyHeading);
  root.style.setProperty('--font-weight-heading', theme.typography.headingWeight);
  root.style.setProperty('--font-weight-body', theme.typography.bodyWeight);
  
  // Spacing
  root.style.setProperty('--radius', theme.spacing.borderRadius);
  root.style.setProperty('--radius-lg', theme.spacing.borderRadiusLg);
  root.style.setProperty('--radius-full', theme.spacing.borderRadiusFull);
  
  // Effects
  root.style.setProperty('--shadow', theme.effects.shadow);
  root.style.setProperty('--shadow-lg', theme.effects.shadowLg);
  root.style.setProperty('--shadow-card', theme.effects.shadowCard);
}

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeId;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(initialTheme || defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as ThemeId | null;
    if (savedTheme && themes[savedTheme]) {
      setThemeId(savedTheme);
    } else if (initialTheme) {
      setThemeId(initialTheme);
    }
    setMounted(true);
  }, [initialTheme]);

  useEffect(() => {
    if (mounted) {
      const theme = getTheme(themeId);
      applyThemeVariables(theme);
      localStorage.setItem('theme', themeId);
      
      // Add theme class to body for CSS targeting
      document.body.className = document.body.className
        .split(' ')
        .filter(c => !c.startsWith('theme-'))
        .join(' ');
      document.body.classList.add(`theme-${themeId}`);
    }
  }, [themeId, mounted]);

  const setTheme = (id: ThemeId) => {
    if (themes[id]) {
      setThemeId(id);
    }
  };

  const value: ThemeContextType = {
    theme: getTheme(themeId),
    themeId,
    setTheme,
    availableThemes: Object.values(themes),
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
