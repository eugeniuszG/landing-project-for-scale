'use client';

import { useTheme } from '../../lib/ThemeContext';
import HeroSplit from './HeroSplit';
import HeroFullwidth from './HeroFullwidth';
import HeroFormFocused from './HeroFormFocused';
import HeroStory from './HeroStory';
import HeroGallery from './HeroGallery';

export interface HeroProps {
  title: string;
  subtitle?: string;
  
  // For split variant
  bulletPoints?: string[];
  heroImage?: string;
  
  // For fullwidth variant
  backgroundImage?: string;
  badges?: { icon?: string; text: string }[];
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  
  // For form-focused variant
  formTitle?: string;
  features?: { value: string; label: string }[];
  
  // For story variant
  story?: string;
  teamImage?: string;
  steps?: { number: string; title: string; description: string }[];
  
  // For gallery variant
  projects?: { image: string; title: string; category?: string }[];
  
  // Common
  ctaText?: string;
  ctaHref?: string;
}

export default function Hero(props: HeroProps) {
  const { theme } = useTheme();
  
  switch (theme.heroVariant) {
    case 'split':
      return (
        <HeroSplit
          title={props.title}
          subtitle={props.subtitle}
          ctaText={props.ctaText}
          ctaHref={props.ctaHref}
          heroImage={props.heroImage}
          bulletPoints={props.bulletPoints}
        />
      );
      
    case 'fullwidth':
      return (
        <HeroFullwidth
          title={props.title}
          subtitle={props.subtitle}
          ctaPrimaryText={props.ctaText}
          ctaPrimaryHref={props.ctaHref}
          ctaSecondaryText={props.ctaSecondaryText}
          ctaSecondaryHref={props.ctaSecondaryHref}
          backgroundImage={props.backgroundImage}
          badges={props.badges}
        />
      );
      
    case 'form-focused':
      return (
        <HeroFormFocused
          title={props.title}
          subtitle={props.subtitle}
          formTitle={props.formTitle}
          backgroundImage={props.backgroundImage}
          features={props.features}
        />
      );
      
    case 'story':
      return (
        <HeroStory
          title={props.title}
          story={props.story || props.subtitle || ''}
          ctaText={props.ctaText}
          ctaHref={props.ctaHref}
          teamImage={props.teamImage}
          steps={props.steps}
        />
      );
      
    case 'gallery':
      return (
        <HeroGallery
          title={props.title}
          subtitle={props.subtitle}
          projects={props.projects || []}
          ctaText={props.ctaText}
          ctaHref={props.ctaHref}
        />
      );
      
    default:
      return (
        <HeroSplit
          title={props.title}
          subtitle={props.subtitle}
          ctaText={props.ctaText}
          ctaHref={props.ctaHref}
          heroImage={props.heroImage}
          bulletPoints={props.bulletPoints}
        />
      );
  }
}
