'use client';

import Image from 'next/image';
import { siteConfig } from '../../lib/siteConfig';

interface HeroSplitProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  heroImage?: string;
  bulletPoints?: string[];
}

export default function HeroSplit({
  title,
  subtitle,
  ctaText = "Get a Quote",
  ctaHref = "/contact",
  heroImage = "/assets/hero-image.jpg",
  bulletPoints = [],
}: HeroSplitProps) {
  return (
    <section 
      className="min-h-screen flex items-center py-16 px-4"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Content Side */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width * 4}
                height={siteConfig.logo.height * 4}
                priority
                className="h-auto max-w-[200px] md:max-w-[280px]"
              />
            </div>
            
            <h1 
              className="text-3xl md:text-5xl font-bold mb-6 text-balance"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {title}
            </h1>
            
            {subtitle && (
              <p 
                className="text-lg md:text-xl mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {subtitle}
              </p>
            )}
            
            {bulletPoints.length > 0 && (
              <ul className="space-y-3 mb-8">
                {bulletPoints.map((point, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <svg 
                      className="w-5 h-5 mt-0.5 flex-shrink-0" 
                      fill="var(--color-accent)" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            )}
            
            <a
              href={ctaHref}
              className="inline-block px-8 py-4 text-lg font-semibold transition-all duration-200 btn-accent"
            >
              {ctaText}
            </a>
          </div>
          
          {/* Image Side */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div 
              className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden"
              style={{ borderRadius: 'var(--radius-lg)' }}
            >
              <Image
                src={heroImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
