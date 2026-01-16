'use client';

import { useState } from 'react';

// Feature flag - set to true to show testimonials
const SHOW_TESTIMONIALS = true;

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  project: string;
}

// Opinie klientów
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anna K.",
    location: "Warszawa",
    rating: 5,
    text: "Wyjątkowa obsługa od początku do końca. Zespół był profesjonalny, komunikatywny i dostarczył dokładnie to, czego chcieliśmy. Gorąco polecam!",
    project: "Pełna realizacja"
  },
  {
    id: 2,
    name: "Piotr M.",
    location: "Kraków",
    rating: 5,
    text: "Doskonała jakość i dbałość o szczegóły. Przekroczyli nasze oczekiwania. Na pewno skorzystam z ich usług ponownie.",
    project: "Pakiet Premium"
  },
  {
    id: 3,
    name: "Katarzyna W.",
    location: "Gdańsk",
    rating: 5,
    text: "Świetna komunikacja przez cały projekt. Uczciwe ceny i doskonałe rezultaty. Współpraca z zespołem to czysta przyjemność.",
    project: "Rozwiązanie na miarę"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Don't render if feature flag is disabled
  if (!SHOW_TESTIMONIALS) {
    return null;
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      className="py-16 px-4"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Co mówią nasi klienci
        </h2>
        <p 
          className="text-center mb-12"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Opinie zadowolonych klientów
        </p>

        <div 
          className="relative p-8 md:p-12"
          style={{ 
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Stars */}
          <div className="flex justify-center mb-6">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6 fill-current"
                style={{ color: 'var(--color-accent)' }}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote 
            className="text-lg md:text-xl text-center mb-6 italic"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            &ldquo;{currentTestimonial.text}&rdquo;
          </blockquote>

          {/* Author info */}
          <div className="text-center">
            <p 
              className="font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {currentTestimonial.name}
            </p>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {currentTestimonial.location}
            </p>
            <p 
              className="text-sm font-medium mt-1"
              style={{ color: 'var(--color-accent)' }}
            >
              {currentTestimonial.project}
            </p>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md transition-all duration-200"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            aria-label="Poprzednia opinia"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md transition-all duration-200"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            aria-label="Następna opinia"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-3 rounded-full transition-all"
              style={{ 
                backgroundColor: index === currentIndex ? 'var(--color-accent)' : 'var(--color-border)',
                width: index === currentIndex ? '2rem' : '0.75rem',
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p 
            className="mb-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Dołącz do grona zadowolonych klientów!
          </p>
          <a
            href="/#kontakt"
            className="inline-block px-8 py-3 font-semibold shadow-sm transition-all duration-200 btn-accent"
          >
            Skontaktuj się
          </a>
        </div>
      </div>
    </section>
  );
}

