'use client';

import Image from 'next/image';
import { useState } from 'react';
import { siteConfig } from '../../lib/siteConfig';

interface HeroFormFocusedProps {
  title: string;
  subtitle?: string;
  formTitle?: string;
  backgroundImage?: string;
  features?: { value: string; label: string }[];
}

export default function HeroFormFocused({
  title,
  subtitle,
  formTitle = "Bezpłatna wycena",
  backgroundImage = "/assets/hero-bg.svg",
  features = [],
}: HeroFormFocusedProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert('Dziękujemy! Skontaktujemy się wkrótce.');
  };

  return (
    <section className="relative min-h-screen flex items-center py-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--color-bg-overlay)' }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left - Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="mb-6">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width * 3}
                height={siteConfig.logo.height * 3}
                priority
                className="h-auto max-w-[160px] mx-auto lg:mx-0"
              />
            </div>
            
            <h1 
              className="text-3xl md:text-5xl font-bold mb-6 text-balance"
              style={{ color: 'var(--color-text-on-accent)' }}
            >
              {title}
            </h1>
            
            {subtitle && (
              <p 
                className="text-lg md:text-xl mb-8 opacity-90"
                style={{ color: 'var(--color-text-on-accent)' }}
              >
                {subtitle}
              </p>
            )}
            
            {/* Quick Stats */}
            {features.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="text-3xl md:text-4xl font-bold"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {feature.value}
                    </div>
                    <div 
                      className="text-sm opacity-80"
                      style={{ color: 'var(--color-text-on-accent)' }}
                    >
                      {feature.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right - Form */}
          <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
            <div 
              className="p-8"
              style={{ 
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <h2 
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {formTitle}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border outline-none transition-all focus:ring-2"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      borderRadius: 'var(--radius)',
                      backgroundColor: 'var(--color-bg-primary)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Numer telefonu
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 border outline-none transition-all focus:ring-2"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      borderRadius: 'var(--radius)',
                      backgroundColor: 'var(--color-bg-primary)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Adres e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border outline-none transition-all focus:ring-2"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      borderRadius: 'var(--radius)',
                      backgroundColor: 'var(--color-bg-primary)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>
                
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="mt-1"
                  />
                  <label 
                    htmlFor="consent" 
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Wyrażam zgodę na kontakt w sprawie mojego zapytania
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-lg font-bold transition-all btn-accent disabled:opacity-50"
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Bezpłatna wycena'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
