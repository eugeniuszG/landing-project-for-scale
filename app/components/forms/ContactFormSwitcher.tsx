'use client'

import React, { useState } from 'react';
import ContactFormQuick from './ContactFormQuick';
import ContactFormQuote from './ContactFormQuote';
import ContactFormDetailed from './ContactFormDetailed';

export type FormType = 'quick' | 'quote' | 'detailed';

interface FormOption {
  id: FormType;
  name: string;
  description: string;
  icon: string;
  bestFor: string;
}

const FORM_OPTIONS: FormOption[] = [
  {
    id: 'quick',
    name: 'Szybki kontakt',
    description: 'Twoi klienci zostawiają tylko telefon — Ty oddzwaniasz',
    icon: '📞',
    bestFor: 'Hydraulik, elektryk, usługi lokalne',
  },
  {
    id: 'quote',
    name: 'Zapytanie o wycenę',
    description: 'Klient wybiera usługę i budżet — dostajesz gotowe zapytanie',
    icon: '📋',
    bestFor: 'Remonty, wykonawcy, firmy usługowe',
  },
  {
    id: 'detailed',
    name: 'Szczegółowe zapytanie',
    description: 'Pełny brief od klienta z opisem projektu',
    icon: '📝',
    bestFor: 'Architekci, projektanci, B2B',
  },
];

interface ContactFormSwitcherProps {
  defaultForm?: FormType;
  showSwitcher?: boolean;
}

export default function ContactFormSwitcher({ 
  defaultForm = 'quote',
  showSwitcher = true 
}: ContactFormSwitcherProps) {
  const [selectedForm, setSelectedForm] = useState<FormType>(defaultForm);

  const renderForm = () => {
    switch (selectedForm) {
      case 'quick':
        return <ContactFormQuick />;
      case 'quote':
        return <ContactFormQuote />;
      case 'detailed':
        return <ContactFormDetailed />;
      default:
        return <ContactFormQuote />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showSwitcher && (
        <div className="mb-8">
          <label 
            className="block text-sm font-medium mb-3 text-center"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Wybierz typ formularza:
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {FORM_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedForm(option.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                  selectedForm === option.id ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: selectedForm === option.id 
                    ? 'var(--color-bg-accent)' 
                    : 'var(--color-bg-primary)',
                  borderColor: selectedForm === option.id 
                    ? 'var(--color-accent)' 
                    : 'var(--color-border, #e5e7eb)',
                  '--tw-ring-color': 'var(--color-accent)',
                } as React.CSSProperties}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{option.icon}</span>
                  <span 
                    className="font-semibold text-sm"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {option.name}
                  </span>
                </div>
                <p 
                  className="text-xs mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {option.description}
                </p>
                <p 
                  className="text-xs italic"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Dla: {option.bestFor}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div 
        className="p-6 md:p-8 rounded-lg"
        style={{ 
          backgroundColor: 'var(--color-bg-secondary)',
          boxShadow: 'var(--shadow-card, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
        }}
      >
        {renderForm()}
      </div>
    </div>
  );
}
