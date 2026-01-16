'use client';

import Image from 'next/image';
import { siteConfig } from '../../lib/siteConfig';

interface HeroFullwidthProps {
  title: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  backgroundImage?: string;
  badges?: { icon?: string; text: string }[];
}

export default function HeroFullwidth({
  title,
  subtitle,
  ctaPrimaryText = "Bezpłatna wycena",
  ctaPrimaryHref = "/#kontakt",
  ctaSecondaryText,
  ctaSecondaryHref,
  backgroundImage = "/assets/hero-bg.svg",
  badges = [],
}: HeroFullwidthProps) {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
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
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src={siteConfig.logo.src}
            alt={siteConfig.logo.alt}
            width={siteConfig.logo.width * 3}
            height={siteConfig.logo.height * 3}
            priority
            className="h-auto max-w-[180px] md:max-w-[240px] drop-shadow-lg"
          />
        </div>
        
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance max-w-4xl mx-auto"
          style={{ color: 'var(--color-text-on-accent)' }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90"
            style={{ color: 'var(--color-text-on-accent)' }}
          >
            {subtitle}
          </p>
        )}
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href={ctaPrimaryHref}
            className="inline-block px-8 py-4 text-lg font-semibold transition-all duration-200 btn-accent"
          >
            {ctaPrimaryText}
          </a>
          
          {ctaSecondaryText && ctaSecondaryHref && (
            <a
              href={ctaSecondaryHref}
              className="inline-block px-8 py-4 text-lg font-semibold transition-all duration-200 border-2"
              style={{ 
                borderColor: 'var(--color-text-on-accent)',
                color: 'var(--color-text-on-accent)',
                borderRadius: 'var(--radius)',
              }}
            >
              {ctaSecondaryText}
            </a>
          )}
        </div>
        
        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="card-theme px-6 py-3 flex items-center gap-2"
              >
                {badge.icon && <span className="text-xl">{badge.icon}</span>}
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
