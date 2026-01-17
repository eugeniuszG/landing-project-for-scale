'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
  captcha?: string;
}

const SERVICE_OPTIONS = [
  { value: '', label: 'Wybierz usługę...' },
  { value: 'landing', label: 'Landing page (1 strona)' },
  { value: 'multipage', label: 'Strona wielostronicowa' },
  { value: 'ecommerce', label: 'Sklep internetowy' },
  { value: 'redesign', label: 'Redesign istniejącej strony' },
  { value: 'other', label: 'Inne' },
];

const BUDGET_OPTIONS = [
  { value: '', label: 'Wybierz budżet...' },
  { value: '1000-2000', label: '1 000 – 2 000 zł' },
  { value: '2000-4000', label: '2 000 – 4 000 zł' },
  { value: '4000-7000', label: '4 000 – 7 000 zł' },
  { value: '7000+', label: 'Powyżej 7 000 zł' },
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'Kiedy potrzebujesz?' },
  { value: 'asap', label: 'Jak najszybciej' },
  { value: '1-2weeks', label: '1–2 tygodnie' },
  { value: '1month', label: 'W ciągu miesiąca' },
  { value: 'flexible', label: 'Elastyczny termin' },
];

export default function ContactFormQuote() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [status, setStatus] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaQuestion, setCaptchaQuestion] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Imię jest wymagane';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Numer telefonu jest wymagany';
    } else if (!/^\+?[0-9\s-]{9,}$/.test(formData.phone)) {
      newErrors.phone = 'Nieprawidłowy format numeru';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    if (!formData.serviceType) newErrors.serviceType = 'Wybierz rodzaj usługi';
    if (!userAnswer) newErrors.captcha = 'Odpowiedź jest wymagana';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot || !validateForm()) return;

    setIsSubmitting(true);
    setStatus('Wysyłanie...');

    const serviceLabel = SERVICE_OPTIONS.find(s => s.value === formData.serviceType)?.label || formData.serviceType;
    const budgetLabel = BUDGET_OPTIONS.find(b => b.value === formData.budget)?.label || formData.budget;
    const timelineLabel = TIMELINE_OPTIONS.find(t => t.value === formData.timeline)?.label || formData.timeline;

    const fullMessage = `
Usługa: ${serviceLabel}
Budżet: ${budgetLabel || 'Nie podano'}
Termin: ${timelineLabel || 'Nie podano'}

${formData.message || 'Brak dodatkowej wiadomości'}
    `.trim();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.name,
          lastName: '',
          email: formData.email,
          phoneNumber: formData.phone,
          message: fullMessage,
          formType: 'quote',
          userAnswer,
          captchaToken,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Dziękujemy! Przygotujemy wycenę i odezwiemy się wkrótce.');
        setFormData({ name: '', phone: '', email: '', serviceType: '', budget: '', timeline: '', message: '' });
        setUserAnswer('');
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
          Zapytanie o wycenę
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Wypełnij formularz — otrzymasz wycenę w 24h
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Twoje imię *"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            style={inputStyle}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

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
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email (opcjonalnie)"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
        >
          {SERVICE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
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
          name="message"
          placeholder="Dodatkowe informacje (opcjonalnie)"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
          rows={3}
        />
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
        {isSubmitting ? 'Wysyłanie...' : 'Poproś o wycenę'}
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
