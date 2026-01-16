'use client';

import Image from 'next/image';
import { siteConfig } from '../../lib/siteConfig';

interface HeroStoryProps {
  title: string;
  story: string;
  ctaText?: string;
  ctaHref?: string;
  teamImage?: string;
  steps?: { number: string; title: string; description: string }[];
}

export default function HeroStory({
  title,
  story,
  ctaText = "Dowiedz się więcej",
  ctaHref = "/#kontakt",
  teamImage = "/assets/team.svg",
  steps = [],
}: HeroStoryProps) {
  return (
    <section 
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="container mx-auto">
        {/* Top Section - Story */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div 
              className="relative aspect-[4/3] w-full overflow-hidden"
              style={{ borderRadius: 'var(--radius-lg)' }}
            >
              <Image
                src={teamImage}
                alt="Nasz zespół"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width * 2}
                height={siteConfig.logo.height * 2}
                className="h-auto max-w-[120px]"
              />
            </div>
            
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {title}
            </h1>
            
            <p 
              className="text-lg mb-8 leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {story}
            </p>
            
            <a
              href={ctaHref}
              className="inline-block px-8 py-4 text-lg font-semibold transition-all duration-200 btn-accent"
            >
              {ctaText}
            </a>
          </div>
        </div>
        
        {/* Steps Section */}
        {steps.length > 0 && (
          <div 
            className="p-8 md:p-12"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold text-center mb-12"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Jak pracujemy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold"
                    style={{ 
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-text-on-accent)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {step.number}
                  </div>
                  <h3 
                    className="font-semibold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
