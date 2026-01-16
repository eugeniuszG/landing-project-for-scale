'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

// FAQ items - Polish content
const faqItems: FAQItem[] = [
  {
    question: 'Ile kosztuje wasza usługa?',
    answer: 'Cena zależy od zakresu prac i specyficznych wymagań. Oferujemy bezpłatne konsultacje i szczegółowe wyceny. Skontaktuj się z nami, aby omówić projekt i uzyskać dokładną wycenę.',
  },
  {
    question: 'Jak długo trwa typowy projekt?',
    answer: 'Czas realizacji zależy od złożoności projektu. Małe projekty trwają zazwyczaj 1-2 tygodnie, większe mogą zająć 3-4 tygodnie. Szczegółowy harmonogram przedstawiamy podczas wyceny.',
  },
  {
    question: 'Czy oferujecie usługi projektowe?',
    answer: 'Tak, oferujemy kompleksowe usługi projektowe. Nasz zespół współpracuje z Tobą, aby stworzyć rozwiązanie dopasowane do Twoich potrzeb i preferencji.',
  },
  {
    question: 'W jakich lokalizacjach świadczycie usługi?',
    answer: 'Obsługujemy klientów w całym regionie i okolicach. Skontaktuj się z nami, aby potwierdzić dostępność usług w Twojej lokalizacji.',
  },
  {
    question: 'Czy wycena jest bezpłatna?',
    answer: 'Tak, oferujemy bezpłatne wyceny bez zobowiązań. Umów się na konsultację, a przedstawimy szczegółową wycenę w ciągu 2-3 dni roboczych.',
  },
  {
    question: 'Co obejmuje wasza usługa?',
    answer: 'Nasza kompleksowa usługa obejmuje konsultację, planowanie, realizację i wsparcie po zakończeniu projektu. Zajmujemy się wszystkim od początku do końca.',
  },
  {
    question: 'Jak mogę rozpocząć współpracę?',
    answer: 'To proste! Skontaktuj się z nami telefonicznie, mailowo lub przez formularz na stronie. Umówimy bezpłatną konsultację, omówimy Twoje potrzeby i przedstawimy wycenę.',
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
            Najczęściej zadawane pytania
          </p>
          <h2 
            className="text-3xl sm:text-4xl font-bold mt-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            FAQ
          </h2>
          <p 
            className="text-lg mt-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Znajdź odpowiedzi na najczęstsze pytania naszych klientów
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
            Masz więcej pytań? Skontaktuj się z nami!
          </p>
          <a
            href="/#kontakt"
            className="inline-flex items-center px-6 py-3 font-semibold transition-colors btn-accent"
          >
            Zadaj pytanie
          </a>
        </div>
      </div>
    </section>
  );
}
