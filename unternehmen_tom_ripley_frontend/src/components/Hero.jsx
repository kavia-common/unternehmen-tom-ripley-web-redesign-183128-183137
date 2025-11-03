import React from 'react';
import Section from './Section';

/**
 * PUBLIC_INTERFACE
 * Hero component for the Ocean Professional themed landing page.
 *
 * - Uses the shared Section wrapper with hero background variant
 * - Provides an H1 heading with responsive clamp() typography
 * - Includes supporting copy text
 * - Two CTAs:
 *    - Primary button linking to #contact
 *    - Secondary link-style button linking to #services
 * - Ensures accessible semantics for links styled as buttons
 */
function Hero() {
  return (
    <Section
      id="home"
      hero
      size="lg"
      className="hero"
    >
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title h1">
            Elevate Your Business with Ocean‑Grade Precision
          </h1>
          <p className="hero-subtitle">
            We craft modern, reliable solutions that help organizations grow.
            Harness clarity, performance, and a calm, professional aesthetic.
          </p>

          <div className="hero-ctas">
            {/* Primary CTA - real link with button styling */}
            <a
              href="#contact"
              className="btn btn-primary btn-lg"
              role="button"
              aria-label="Go to contact section to get in touch"
            >
              Contact Us
            </a>

            {/* Secondary CTA */}
            <a
              href="#services"
              className="btn btn-secondary btn-lg"
              role="button"
              aria-label="Explore our services section"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Optional decorative element (gradient sheen) */}
        <div className="hero-decor" aria-hidden="true" />
      </div>

      {/* Local styles scoped by .hero classes */}
      <style>{`
        .hero {
          position: relative;
          overflow: hidden;
        }
        .hero-inner {
          display: grid;
          align-items: center;
          min-height: clamp(400px, 60vh, 720px);
          position: relative;
        }
        .hero-content {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }
        .hero-title {
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          font-size: clamp(2rem, 1.2rem + 3.2vw, 3.25rem);
          color: var(--text);
          margin-bottom: var(--space-4);
        }
        .hero-subtitle {
          color: var(--text-muted);
          font-size: clamp(1rem, 0.9rem + 0.6vw, 1.25rem);
          margin: 0 auto var(--space-8);
          max-width: 60ch;
        }
        .hero-ctas {
          display: inline-flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .btn-lg {
          padding: 12px 18px;
          font-size: clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem);
          border-radius: var(--radius-md);
        }

        /* Decorative radial sheen for depth */
        .hero-decor {
          position: absolute;
          inset: -20% -10% auto -10%;
          height: 70%;
          background: radial-gradient(
            60% 60% at 50% 30%,
            color-mix(in srgb, var(--color-primary) 22%, transparent),
            transparent 70%
          );
          pointer-events: none;
          transform: translateZ(0);
        }

        @media (min-width: 768px) {
          .hero-content { text-align: center; }
        }
      `}</style>
    </Section>
  );
}

export default Hero;
