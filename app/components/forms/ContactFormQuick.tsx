'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface FormData {
  name: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
  captcha?: string;
}

export default function ContactFormQuick() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!userAnswer) newErrors.captcha = 'Odpowiedź jest wymagana';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot || !validateForm()) return;

    setIsSubmitting(true);
    setStatus('Wysyłanie...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.name,
          lastName: '',
          email: '',
          phoneNumber: formData.phone,
          message: formData.message || 'Proszę o kontakt telefoniczny',
          formType: 'quick',
          userAnswer,
          captchaToken,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Dziękujemy! Oddzwonimy wkrótce.');
        setFormData({ name: '', phone: '', message: '' });
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
          Szybki kontakt
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Zostaw numer — oddzwonimy w ciągu 2h
        </p>
      </div>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Twoje imię"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={{ ...inputStyle, '--tw-ring-color': 'var(--color-accent)' } as React.CSSProperties}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Numer telefonu"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Krótka wiadomość (opcjonalnie)"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
          rows={2}
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
        {isSubmitting ? 'Wysyłanie...' : 'Zadzwoń do mnie'}
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
