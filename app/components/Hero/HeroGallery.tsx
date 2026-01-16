'use client';

import Image from 'next/image';
import { siteConfig } from '../../lib/siteConfig';

interface Project {
  image: string;
  title: string;
  category?: string;
}

interface HeroGalleryProps {
  title: string;
  subtitle?: string;
  projects: Project[];
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroGallery({
  title,
  subtitle,
  projects = [],
  ctaText = "Zobacz wszystkie projekty",
  ctaHref = "/#portfolio",
}: HeroGalleryProps) {
  return (
    <section 
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width * 2}
              height={siteConfig.logo.height * 2}
              priority
              className="h-auto max-w-[100px]"
            />
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </h1>
          
          {subtitle && (
            <p 
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.slice(0, 6).map((project, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden cursor-pointer"
              style={{ borderRadius: 'var(--radius-lg)' }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                  style={{ background: 'linear-gradient(to top, var(--color-bg-overlay), transparent)' }}
                >
                  <div className="p-6 w-full">
                    {project.category && (
                      <span 
                        className="text-xs uppercase tracking-wider mb-2 block"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {project.category}
                      </span>
                    )}
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-on-accent)' }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold transition-all duration-200 btn-accent"
          >
            {ctaText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
