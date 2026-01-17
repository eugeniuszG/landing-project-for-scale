'use client';

import { useState } from 'react';

interface HostingOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  benefits: string[];
  note?: string;
}

const HOSTING_OPTIONS: HostingOption[] = [
  {
    id: 'managed',
    title: 'Hosting u mnie',
    subtitle: 'Pod klucz — najprościej',
    icon: '🔧',
    benefits: [
      'Strona działa na mojej infrastrukturze (Vercel)',
      'Ty kupujesz domenę, ja podpinam ją do strony',
      'Drobne poprawki i aktualizacje w cenie',
      'Zero technicznych tematów po Twojej stronie',
    ],
    note: 'Najszybszy start — wszystkim zajmuję się ja',
  },
  {
    id: 'client',
    title: 'Hosting u Ciebie',
    subtitle: 'Może być 0 zł / miesiąc',
    icon: '💼',
    benefits: [
      'Strona na Twoim koncie Vercel (darmowy plan)',
      'Pełna własność: dostęp do projektu i domeny',
      'Konfigurację robię za Ciebie',
      'Hosting może być całkowicie bezpłatny',
    ],
    note: '100% kontroli w Twoich rękach',
  },
  {
    id: 'static',
    title: 'Hosting klasyczny',
    subtitle: 'Wersja statyczna HTML',
    icon: '📦',
    benefits: [
      'Przygotowuję wersję HTML/CSS/JS',
      'Wrzucasz na dowolny hosting u operatora domeny',
      'Działa jak „zwykła strona"',
      'Formularz przez zewnętrzny serwis (np. Formspree)',
    ],
    note: 'Dla tych, którzy mają już swój hosting',
  },
];

const COST_INFO = {
  free: [
    'Hosting na Vercel (plan free) — przy opcji "u Ciebie"',
    'Certyfikat SSL (https) — automatycznie',
    'Wdrożenie strony (publikacja + podpięcie domeny) — wliczone w pakiet',
  ],
  paid: [
    'Domena (np. .pl) — opłata roczna u rejestratora (~50-100 zł/rok)',
    'Poczta firmowa (np. biuro@twojafirma.pl) — zależy od dostawcy',
  ],
};

export default function HostingOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200"
        style={{
          backgroundColor: 'var(--color-bg-accent)',
          color: 'var(--color-text-primary)',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🏠</span>
          <div className="text-left">
            <div className="font-semibold">Hosting i własność strony</div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Wybierz gdzie ma być hostowana Twoja strona
            </div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="mt-4 p-6 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-primary)' }}
        >
          {/* Hosting Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {HOSTING_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  selectedOption === option.id ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: selectedOption === option.id 
                    ? 'var(--color-bg-accent)' 
                    : 'var(--color-bg-secondary)',
                  borderColor: selectedOption === option.id 
                    ? 'var(--color-accent)' 
                    : 'transparent',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <div 
                      className="font-semibold text-sm"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {option.title}
                    </div>
                    <div 
                      className="text-xs"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {option.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Option Details */}
          {selectedOption && (
            <div 
              className="p-4 rounded-lg mb-6"
              style={{ backgroundColor: 'var(--color-bg-accent)' }}
            >
              {HOSTING_OPTIONS.filter(o => o.id === selectedOption).map((option) => (
                <div key={option.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{option.icon}</span>
                    <span 
                      className="font-semibold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {option.title}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-3">
                    {option.benefits.map((benefit, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <span style={{ color: 'var(--color-accent)' }}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  {option.note && (
                    <p 
                      className="text-sm italic"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      💡 {option.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Cost Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <div 
                className="font-semibold text-sm mb-2 flex items-center gap-2"
                style={{ color: 'var(--color-success, #22c55e)' }}
              >
                ✓ Może być darmowe
              </div>
              <ul className="space-y-1">
                {COST_INFO.free.map((item, idx) => (
                  <li 
                    key={idx}
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <div 
                className="font-semibold text-sm mb-2 flex items-center gap-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                💳 Zwykle płatne
              </div>
              <ul className="space-y-1">
                {COST_INFO.paid.map((item, idx) => (
                  <li 
                    key={idx}
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Note */}
          <p 
            className="text-xs text-center mt-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Wdrożenie strony (publikacja + podpięcie domeny) jest wliczone w każdy pakiet.
          </p>
        </div>
      )}
    </div>
  );
}
