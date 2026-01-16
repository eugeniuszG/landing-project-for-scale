'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

interface PortfolioItem {
  title: string;
  location: string;
  category: string;
  description: string;
  tags: string[];
  heroImage: string;
  photos: { src: string; alt: string }[];
}

// Portfolio - dostosuj dla klienta
const portfolioItems: PortfolioItem[] = [
  {
    title: 'Projekt Alfa',
    location: 'Warszawa',
    category: 'Premium',
    description: 'Kompleksowy projekt prezentujący pełen zakres naszych możliwości z wyjątkowymi rezultatami.',
    tags: ['premium', 'wyróżniony', 'kompletny'],
    heroImage: '/assets/portfolio/project-1.jpg',
    photos: [
      { src: '/assets/portfolio/project-1.jpg', alt: 'Projekt Alfa - Widok główny' },
      { src: '/assets/portfolio/project-1-2.jpg', alt: 'Projekt Alfa - Szczegóły' },
    ],
  },
  {
    title: 'Projekt Beta',
    location: 'Kraków',
    category: 'Standard',
    description: 'Efektywne rozwiązanie dostarczone na czas i w budżecie z dbałością o szczegóły.',
    tags: ['efektywny', 'ekonomiczny'],
    heroImage: '/assets/portfolio/project-2.jpg',
    photos: [
      { src: '/assets/portfolio/project-2.jpg', alt: 'Projekt Beta - Widok główny' },
      { src: '/assets/portfolio/project-2-2.jpg', alt: 'Projekt Beta - Szczegóły' },
    ],
  },
  {
    title: 'Projekt Gamma',
    location: 'Gdańsk',
    category: 'Na miarę',
    description: 'Unikalne rozwiązanie dopasowane do specyficznych wymagań klienta z innowacyjnym podejściem.',
    tags: ['na miarę', 'innowacyjny'],
    heroImage: '/assets/portfolio/project-3.jpg',
    photos: [
      { src: '/assets/portfolio/project-3.jpg', alt: 'Projekt Gamma - Widok główny' },
      { src: '/assets/portfolio/project-3-2.jpg', alt: 'Projekt Gamma - Szczegóły' },
    ],
  },
];

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Nasze Portfolio',
  itemListElement: portfolioItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    description: item.description,
    image: item.heroImage,
  })),
};

export default function PortfolioSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryPhotos = useMemo(
    () =>
      portfolioItems.flatMap((item) =>
        item.photos.map((photo) => ({
          ...photo,
          project: item.title,
          location: item.location,
        })),
      ),
    [],
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length);
  };
  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <section 
      id="portfolio" 
      className="py-16 px-4 sm:px-6 lg:px-10"
      style={{ 
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <p 
            className="text-sm uppercase tracking-widest font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            Nasze realizacje
          </p>
          <h2 
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Portfolio
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Przeglądaj nasze ostatnie projekty i zobacz jakość naszej pracy. Każdy projekt pokazuje nasze zaangażowanie w doskonałość.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <article 
              key={item.title} 
              className="flex flex-col overflow-hidden card-theme"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
                <div 
                  className="absolute bottom-3 left-3 backdrop-blur px-3 py-1 text-xs font-semibold"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {item.location} • {item.category}
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="space-y-2">
                  <h3 
                    className="text-xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1"
                      style={{ 
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-full)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => openLightbox(galleryPhotos.findIndex((p) => p.project === item.title))}
                    className="inline-flex justify-center items-center px-4 py-2 font-semibold transition btn-outline"
                    aria-label={`Zobacz galerię ${item.title}`}
                  >
                    Zobacz galerię
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex flex-col sm:flex-row items-center justify-center gap-4 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria projektów"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl font-semibold hover:text-gray-200"
            aria-label="Zamknij galerię"
          >
            ×
          </button>
          <button
            type="button"
            onClick={showPrev}
            className="text-white text-3xl px-3 py-2 hover:text-gray-200"
            aria-label="Poprzednie zdjęcie"
          >
            ‹
          </button>
          <div 
            className="relative w-full max-w-4xl aspect-[4/3] overflow-hidden shadow-2xl"
            style={{ 
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <Image
              src={galleryPhotos[lightboxIndex].src}
              alt={galleryPhotos[lightboxIndex].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white px-4 py-3 text-sm">
              <p className="font-semibold">{galleryPhotos[lightboxIndex].project}</p>
              <p className="opacity-90">{galleryPhotos[lightboxIndex].location}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={showNext}
            className="text-white text-3xl px-3 py-2 hover:text-gray-200"
            aria-label="Następne zdjęcie"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
