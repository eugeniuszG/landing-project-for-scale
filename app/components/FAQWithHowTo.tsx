type FAQItem = {
  question: string;
  answer: string;
};

type HowToStep = {
  title: string;
  description: string;
};

type FAQWithHowToProps = {
  faqItems: FAQItem[];
  howToSteps: HowToStep[];
  pageUrl: string;
  howToTitle: string;
  howToDescription: string;
  totalTime: string;
};

export function FAQWithHowTo({
  faqItems,
  howToSteps,
  pageUrl,
  howToTitle,
  howToDescription,
  totalTime,
}: FAQWithHowToProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howToTitle,
    description: howToDescription,
    totalTime,
    mainEntityOfPage: pageUrl,
    step: howToSteps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <div className="mb-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Najczęściej zadawane pytania</h2>
      <dl className="space-y-4">
        {faqItems.map((item) => (
          <div key={item.question} className="p-4 bg-white rounded-md shadow-sm">
            <dt className="font-semibold mb-2">{item.question}</dt>
            <dd className="text-sm opacity-80">{item.answer}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-3">{howToTitle}</h3>
        <p className="text-sm opacity-80 mb-4">{howToDescription}</p>
        <ol className="space-y-3 list-decimal list-inside">
          {howToSteps.map((step) => (
            <li key={step.title} className="bg-white rounded-md shadow-sm p-3">
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm opacity-80">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </div>
  );
}
