'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

interface ContactFormFormspreeProps {
  formspreeId?: string;
}

export default function ContactFormFormspree({ 
  formspreeId = 'YOUR_FORMSPREE_ID' 
}: ContactFormFormspreeProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus('Wysyłanie...');

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'nie podano',
          message: formData.message || 'Proszę o kontakt',
        }),
      });

      if (response.ok) {
        setStatus('Dziękujemy! Skontaktujemy się wkrótce.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus('Wystąpił błąd. Spróbuj ponownie.');
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

  const isConfigured = formspreeId !== 'YOUR_FORMSPREE_ID';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
          Formularz kontaktowy
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Zostaw dane — odezwiemy się wkrótce
        </p>
        {!isConfigured && (
          <p className="text-xs mt-2 p-2 rounded" style={{ backgroundColor: 'var(--color-bg-accent)', color: 'var(--color-text-muted)' }}>
            ⚠️ Formularz wymaga konfiguracji Formspree ID
          </p>
        )}
      </div>

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
        <textarea
          name="message"
          placeholder="Wiadomość (opcjonalnie)"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          style={inputStyle}
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isConfigured}
        className="w-full py-3 px-6 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text-on-accent)',
        }}
      >
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
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
