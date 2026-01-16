'use client';

import { useTheme } from '../lib/ThemeContext';
import { ThemeId } from '../lib/themes';

interface ThemeSwitcherProps {
  showLabels?: boolean;
  className?: string;
}

export default function ThemeSwitcher({ showLabels = true, className = '' }: ThemeSwitcherProps) {
  const { themeId, setTheme, availableThemes } = useTheme();

  return (
    <div className={`theme-switcher ${className}`}>
      {showLabels && (
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          Wybierz motyw:
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {availableThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id as ThemeId)}
            className={`
              px-4 py-2 text-sm rounded-lg transition-all duration-200
              ${themeId === theme.id 
                ? 'ring-2 ring-offset-2' 
                : 'hover:opacity-80'
              }
            `}
            style={{
              backgroundColor: themeId === theme.id 
                ? 'var(--color-accent)' 
                : 'var(--color-bg-accent)',
              color: themeId === theme.id 
                ? 'var(--color-text-on-accent)' 
                : 'var(--color-text-primary)',
              borderRadius: 'var(--radius)',
            }}
            title={theme.description}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Compact version for navbar/footer
export function ThemeSwitcherCompact({ className = '' }: { className?: string }) {
  const { themeId, setTheme, availableThemes } = useTheme();

  return (
    <select
      value={themeId}
      onChange={(e) => setTheme(e.target.value as ThemeId)}
      className={`
        px-3 py-1.5 text-sm rounded transition-all
        ${className}
      `}
      style={{
        backgroundColor: 'var(--color-bg-accent)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
      }}
    >
      {availableThemes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
