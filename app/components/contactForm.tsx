'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Button from './button';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  message?: string;
  captcha?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [status, setStatus] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaQuestion, setCaptchaQuestion] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
      setStatus('Nie udało się załadować captcha. Odśwież stronę.');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Imię jest wymagane.';
    if (!formData.lastName) newErrors.lastName = 'Nazwisko jest wymagane.';
    if (!formData.email) {
      newErrors.email = 'Email jest wymagany.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email.';
    }
    if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Numer telefonu jest wymagany.';
    } else if (!/^\+?[0-9\s-]{9,}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Nieprawidłowy format numeru telefonu.';
    }
    if (!formData.message) newErrors.message = 'Wiadomość jest wymagana.';
    if (!userAnswer) newErrors.captcha = 'Odpowiedź na pytanie jest wymagana.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (honeypot) {
      // It's a bot
      console.log("Honeypot field filled. Submission rejected.");
      setStatus('Wystąpił błąd. Proszę spróbować ponownie później.');
      return;
    }

    if (!validateForm()) {
      setStatus('Proszę wypełnić wszystkie pola poprawnie.');
      return;
    }

    setStatus('Wysyłanie...');

    const submitWithNetworkRetry = async () => {
      const maxAttempts = 3;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, userAnswer, captchaToken }),
          });
        } catch (error) {
          if (attempt === maxAttempts) {
            throw error;
          }
          const backoff = 300 * 2 ** (attempt - 1);
          console.warn(`[contact] Transient network error, retrying in ${backoff}ms (attempt ${attempt + 1}/${maxAttempts})`, error);
          await delay(backoff);
        }
      }
      throw new Error('Nie udało się wysłać formularza.');
    };

    try {
      const response = await submitWithNetworkRetry();

      const result = await response.json();

      if (response.ok) {
        setStatus('Wiadomość wysłana pomyślnie!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: ''
        });
        setUserAnswer('');
        fetchCaptcha();
      } else {
        // Log full error details to browser console for debugging
        if (result?.error) {
          console.error('[contact] send failed', result.error);
        }
        const code = result?.error?.code ? ` (kod: ${result.error.code})` : '';
        setStatus((result.message || 'Nie udało się wysłać wiadomości. Proszę spróbować ponownie.') + code);
        if (result.error === 'Invalid captcha') {
            fetchCaptcha();
            setUserAnswer('');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Wystąpił błąd. Proszę spróbować ponownie później.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <input
          type="text"
          name="firstName"
          placeholder="Imię"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
      </div>
      <div className="form-group">
        <input
          type="text"
          name="lastName"
          placeholder="Nazwisko"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div className="form-group">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Numer telefonu"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
      </div>
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Twoja wiadomość..."
          value={formData.message}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black"
          rows={4}
          required
        ></textarea>
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Honeypot field */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input type="text" name="honeypot" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div>
        <label htmlFor="mathCaptcha" className="block mb-2">{captchaQuestion}</label>
        <input
          type="text"
          id="mathCaptcha"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
        {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}
      </div>
      <Button 
        height="h-12" 
        bgColor="bg-[#960019]" 
        type="submit"
        width="w-full md:w-auto" 
      >
        Wyślij wiadomość
      </Button>
      {status && <p className="mt-4 text-center">{status}</p>}
    </form>
  );
}
