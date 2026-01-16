'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

// Generic FAQ items - customize for your client
const faqItems: FAQItem[] = [
  {
    question: 'How much does your service cost?',
    answer: 'Pricing depends on the scope of work and specific requirements. We offer free consultations and detailed quotes. Contact us to discuss your project and get an accurate estimate.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. Small projects typically take 1-2 weeks, while larger projects may take 3-4 weeks. We provide a detailed timeline during the quote process.',
  },
  {
    question: 'Do you offer design services?',
    answer: 'Yes, we offer comprehensive design services. Our team will work with you to create a custom solution that meets your needs and preferences.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve clients throughout the local area and surrounding regions. Contact us to confirm service availability in your location.',
  },
  {
    question: 'Do you provide free quotes?',
    answer: 'Yes, we offer free, no-obligation quotes. Schedule a consultation and we\'ll provide a detailed estimate within 2-3 business days.',
  },
  {
    question: 'What is included in your service?',
    answer: 'Our comprehensive service includes consultation, planning, execution, and follow-up support. We handle everything from start to finish to ensure your complete satisfaction.',
  },
  {
    question: 'How do I get started?',
    answer: 'Getting started is easy! Contact us via phone, email, or the contact form on our website. We\'ll schedule a free consultation to discuss your needs and provide a quote.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="py-16 px-4 sm:px-6 lg:px-10"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p 
            className="text-sm uppercase tracking-widest font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            Frequently Asked Questions
          </p>
          <h2 
            className="text-3xl sm:text-4xl font-bold mt-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Common Questions
          </h2>
          <p 
            className="text-lg mt-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Find answers to the most common questions from our clients
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden"
              style={{ 
                borderRadius: 'var(--radius)',
                border: '1px solid var(--color-border)',
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span 
                  className="font-semibold pr-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {item.question}
                </span>
                <span
                  className={`text-2xl transition-transform duration-200 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                  style={{ color: 'var(--color-accent)' }}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div 
                  className="px-6 py-4"
                  style={{ backgroundColor: 'var(--color-bg-card)' }}
                >
                  <p 
                    className="leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p 
            className="mb-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Have more questions? Get in touch!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 font-semibold transition-colors btn-accent"
          >
            Ask a Question
          </a>
        </div>
      </div>
    </section>
  );
}
