'use client';

import Hero from './components/Hero';
import { FullWidthSection } from './components/fullWidthSection';
import ThemeSwitcher from './components/ThemeSwitcher';
import FAQSection from './components/FAQSection';
import { siteConfig } from './lib/siteConfig';

// Example content - replace with client-specific content
const heroContent = {
  title: "Professional Services Tailored to Your Needs",
  subtitle: "Quality work, on time, within budget. Get your free quote today.",
  ctaText: "Get Free Quote",
  ctaHref: "/contact",
  heroImage: "/assets/hero-image.jpg",
  backgroundImage: "/assets/hero-bg.jpg",
  bulletPoints: [
    "Free consultation and quote",
    "Experienced professionals",
    "Quality guaranteed",
  ],
  badges: [
    { icon: "✓", text: "Licensed & Insured" },
    { icon: "⭐", text: "5-Star Reviews" },
    { icon: "🏆", text: "10+ Years Experience" },
  ],
  features: [
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "10+", label: "Years Experience" },
  ],
  story: "We're a team of dedicated professionals committed to delivering exceptional results. With over a decade of experience, we've helped hundreds of clients achieve their goals.",
  steps: [
    { number: "1", title: "Contact Us", description: "Reach out for a free consultation" },
    { number: "2", title: "Get Quote", description: "Receive detailed estimate" },
    { number: "3", title: "Plan", description: "We create your project plan" },
    { number: "4", title: "Execute", description: "Professional implementation" },
    { number: "5", title: "Deliver", description: "Quality results on time" },
  ],
  projects: [
    { image: "/assets/project-1.jpg", title: "Project One", category: "Category" },
    { image: "/assets/project-2.jpg", title: "Project Two", category: "Category" },
    { image: "/assets/project-3.jpg", title: "Project Three", category: "Category" },
    { image: "/assets/project-4.jpg", title: "Project Four", category: "Category" },
    { image: "/assets/project-5.jpg", title: "Project Five", category: "Category" },
    { image: "/assets/project-6.jpg", title: "Project Six", category: "Category" },
  ],
};

export default function Home() {
  return (
    <div>
      {/* Theme Switcher Demo - Remove in production */}
      <div 
        className="fixed bottom-4 right-4 z-50 p-4 max-w-sm"
        style={{ 
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <ThemeSwitcher showLabels={false} />
      </div>
      
      {/* Hero Section - automatically uses theme's hero variant */}
      <Hero {...heroContent} />
      
      {/* Services/Pricing Section */}
      <FullWidthSection className="bg-theme-secondary">
        <div className="container mx-auto py-16 px-4">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div 
              className="p-8 text-center card-theme"
            >
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                1299 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                3-Day Launch
              </div>
              <p 
                className="text-sm mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                One-page landing, quick turnaround
              </p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 btn-accent"
              >
                Get Started
              </a>
            </div>
            
            {/* Service Card 2 - Featured */}
            <div 
              className="p-8 text-center card-theme relative"
              style={{ 
                border: '2px solid var(--color-accent)',
              }}
            >
              <div 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-text-on-accent)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Popular
              </div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                2899 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                7-Day Launch
              </div>
              <p 
                className="text-sm mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Landing + extra sections/pages
              </p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 btn-accent"
              >
                Get Started
              </a>
            </div>
            
            {/* Service Card 3 */}
            <div 
              className="p-8 text-center card-theme"
            >
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                3599 PLN
              </div>
              <div 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                11-Day Launch
              </div>
              <p 
                className="text-sm mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Multi-page + stronger SEO setup
              </p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 btn-accent"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </FullWidthSection>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Contact CTA */}
      <FullWidthSection className="bg-theme-accent">
        <div className="container mx-auto py-16 px-4 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Ready to Get Started?
          </h2>
          <p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Contact us today for a free consultation and quote. We&apos;ll help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 text-lg font-semibold btn-accent"
            >
              Contact Us
            </a>
            <a 
              href={`tel:${siteConfig.phone}`}
              className="inline-block px-8 py-4 text-lg font-semibold border-2 transition-colors"
              style={{ 
                borderColor: 'var(--color-accent)',
                color: 'var(--color-accent)',
                borderRadius: 'var(--radius)',
              }}
            >
              Call Now
            </a>
          </div>
        </div>
      </FullWidthSection>
    </div>
  );
}
