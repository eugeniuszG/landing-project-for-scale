'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  address: string;
  features: string[];
  budget: string;
  timeline: string;
  description: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  projectType?: string;
  description?: string;
  captcha?: string;
}

const PROJECT_OPTIONS = [
  { value: '', label: 'Czego dotyczy zapytanie?' },
  { value: 'wycena', label: 'Wycena usługi' },
  { value: 'konsultacja', label: 'Konsultacja / Porada' },
  { value: 'realizacja', label: 'Realizacja projektu' },
  { value: 'naprawa', label: 'Naprawa / Serwis' },
  { value: 'wspolpraca', label: 'Współpraca długoterminowa' },
  { value: 'inne', label: 'Inne' },
];

const FEATURE_OPTIONS = [
  { value: 'pilne', label: 'Pilne / Awaryjne' },
  { value: 'weekend', label: 'Możliwa praca w weekend' },
  { value: 'faktura', label: 'Potrzebuję faktury VAT' },
  { value: 'dojazd', label: 'Dojazd do klienta' },
  { value: 'materialy', label: 'Materiały po stronie wykonawcy' },
  { value: 'gwarancja', label: 'Ważna gwarancja' },
  { value: 'platnosc', label: 'Płatność ratalna / odroczona' },
  { value: 'umowa', label: 'Umowa pisemna' },
];

const BUDGET_OPTIONS = [
  { value: '', label: 'Orientacyjny budżet...' },
  { value: 'do-1000', label: 'Do 1 000 zł' },
  { value: '1000-3000', label: '1 000 – 3 000 zł' },
  { value: '3000-5000', label: '3 000 – 5 000 zł' },
  { value: '5000-10000', label: '5 000 – 10 000 zł' },
  { value: '10000+', label: 'Powyżej 10 000 zł' },
  { value: 'discuss', label: 'Do ustalenia' },
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'Preferowany termin...' },
  { value: 'asap', label: 'Jak najszybciej' },
  { value: 'tydzien', label: 'W tym tygodniu' },
  { value: '2-tygodnie', label: 'W ciągu 2 tygodni' },
  { value: 'miesiac', label: 'W ciągu miesiąca' },
  { value: 'elastyczny', label: 'Termin elastyczny' },
];

export default function ContactFormDetailed() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: '',
    address: '',
    features: [],
    budget: '',
    timeline: '',
    description: ''
  });
  const [status, setStatus] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaQuestion, setCaptchaQuestion] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await fetch(`/api/captcha?ts=${Date.now()}`, { cache: 'no-store' });
      const data = await response.json();
      setCaptchaQuestion(data.question);
      setCaptchaToken(data.token);
    } catch (error) {
      console.error('Failed to fetch captcha:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Imię jest wymagane';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Numer telefonu jest wymagany';
    } else if (!/^\+?[0-9\s-]{9,}$/.test(formData.phone)) {
      newErrors.phone = 'Nieprawidłowy format numeru';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    if (!formData.projectType) newErrors.projectType = 'Wybierz typ projektu';
    if (!formData.description.trim()) newErrors.description = 'Opisz swój projekt';
    if (!userAnswer) newErrors.captcha = 'Odpowiedź jest wymagana';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot || !validateForm()) return;

    setIsSubmitting(true);
    setStatus('Wysyłanie...');

    const projectLabel = PROJECT_OPTIONS.find(p => p.value === formData.projectType)?.label || formData.projectType;
    const budgetLabel = BUDGET_OPTIONS.find(b => b.value === formData.budget)?.label || formData.budget;
    const timelineLabel = TIMELINE_OPTIONS.find(t => t.value === formData.timeline)?.label || formData.timeline;
    const featuresLabels = formData.features.map(f => FEATURE_OPTIONS.find(fo => fo.value === f)?.label || f).join(', ');

    const fullMessage = `
SZCZEGÓŁOWE ZAPYTANIE

Firma: ${formData.company || 'Osoba prywatna'}
Rodzaj zapytania: ${projectLabel}
Adres realizacji: ${formData.address || 'Nie podano'}

Dodatkowe informacje: ${featuresLabels || 'Brak'}
Budżet: ${budgetLabel || 'Nie podano'}
Termin: ${timelineLabel || 'Nie podano'}

OPIS:
${formData.description}

${fileName ? `Załącznik: ${fileName}` : ''}
    `.trim();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.name,
          lastName: formData.company,
          email: formData.email,
          phoneNumber: formData.phone,
          message: fullMessage,
          formType: 'detailed',
          userAnswer,
          captchaToken,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Dziękujemy! Przeanalizujemy Twoje zapytanie i skontaktujemy się wkrótce.');
        setFormData({
          name: '', company: '', phone: '', email: '', projectType: '',
          address: '', features: [], budget: '', timeline: '', description: ''
        });
        setUserAnswer('');
        setFileName('');
        fetchCaptcha();
      } else {
        setStatus(result.message || 'Wystąpił błąd. Spróbuj ponownie.');
        if (result.error === 'Invalid captcha') {
          fetchCaptcha();
          setUserAnswer('');
        }
      }
    } catch {
      setStatus('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    backgroundColor: 'var(--color-bg-primary)',
    borderColor: 'var(--color-border, #e5e7eb)',
    color: 'var(--color-text-primary)',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
          Szczegółowe zapytanie
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Dla większych projektów — im więcej szczegółów, tym lepsza wycena
        </p>
      </div>

      {/* Basic info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Imię i nazwisko *"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            style={inputStyle}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="company"
            placeholder="Nazwa firmy (opcjonalnie)"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Numer telefonu *"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            style={inputStyle}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            style={inputStyle}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Project details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            style={inputStyle}
          >
            {PROJECT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="Adres realizacji (opcjonalnie)"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Features checkboxes */}
      <div>
        <label className="block text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          Dodatkowe informacje:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {FEATURE_OPTIONS.map(feature => (
            <label 
              key={feature.value} 
              className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-opacity-50"
              style={{ backgroundColor: formData.features.includes(feature.value) ? 'var(--color-bg-accent)' : 'transparent' }}
            >
              <input
                type="checkbox"
                checked={formData.features.includes(feature.value)}
                onChange={() => handleFeatureToggle(feature.value)}
                className="rounded"
              />
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {feature.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
        >
          {BUDGET_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          name="timeline"
          value={formData.timeline}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
        >
          {TIMELINE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Opisz czego potrzebujesz — zakres prac, szczegóły, pytania... *"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* File upload */}
      <div>
        <label 
          className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-opacity-50 transition-colors"
          style={{ 
            borderColor: 'var(--color-border, #e5e7eb)',
            backgroundColor: 'var(--color-bg-primary)',
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-text-muted)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {fileName || 'Załącz plik (brief, inspiracje...)'}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
        </label>
      </div>

      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input type="text" name="honeypot" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
          {captchaQuestion}
        </label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
        />
        {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text-on-accent)',
        }}
      >
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
      </button>

      {status && (
        <p 
          className="text-center text-sm mt-2"
          style={{ color: status.includes('Dziękujemy') ? 'var(--color-success, #22c55e)' : 'var(--color-text-secondary)' }}
        >
          {status}
        </p>
      )}
    </form>
  );
}
