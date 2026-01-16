import React, { forwardRef } from 'react';
import Image, { StaticImageData } from 'next/image';

interface FullWidthSectionMainProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage: StaticImageData;
}

export const FullWidthSectionMain = forwardRef<HTMLElement, FullWidthSectionMainProps>(({ 
  children, 
  className = '', 
  backgroundImage
}, ref) => (
  <section 
    ref={ref}
    className={`min-h-screen w-full flex flex-col justify-center items-center ${className}`}
  >
    <div className="absolute inset-0 z-0">
      <Image
        src={backgroundImage}
        alt="Obraz tła"
        fill
        style={{ objectFit: 'cover', opacity: 0.4, objectPosition: 'center' }}
        quality={70}
        priority
        fetchPriority="high"
        placeholder="blur"
        sizes="100vw"
      />
    </div>
    <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
    <div className="relative z-20 w-full">
      {children}
    </div>
  </section>
));

FullWidthSectionMain.displayName = 'FullWidthSectionMain';

interface FullWidthSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const FullWidthSection = forwardRef<HTMLElement, FullWidthSectionProps>(({ children, className = '' }, ref) => (
  <section ref={ref} className={`min-h-screen w-full flex flex-col justify-center items-center ${className}`}>
    {children}
  </section>
));

FullWidthSection.displayName = 'FullWidthSection';