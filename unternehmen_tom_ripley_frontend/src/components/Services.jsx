import React from 'react';
import Section from './Section';

/**
 * PUBLIC_INTERFACE
 * Services section presenting 3–6 service cards in a responsive grid.
 *
 * - Uses shared Section wrapper with id="services"
 * - Semantic headings: h2 for section title, h3 for card titles
 * - Accessible card interactions: keyboard focus outlines and hover elevation
 * - Responsive layout: 1 column on small, 2 on medium, 3 on large screens
 * - Ocean Professional theme styles applied via CSS variables and utility classes
 */
function Services() {
  // Sample services data (3–6 items)
  const services = [
    {
      id: 'strategy',
      title: 'Strategic Consulting',
      description:
        'Identify opportunities and chart clear roadmaps that align with your business objectives.',
      icon: '📈',
    },
    {
      id: 'design',
      title: 'UX/UI Design',
      description:
        'Craft intuitive interfaces with an emphasis on clarity, accessibility, and brand consistency.',
      icon: '🎨',
    },
    {
      id: 'development',
      title: 'Web Development',
      description:
        'Build reliable, performant web applications using modern best practices and clean code.',
      icon: '💻',
    },
    {
      id: 'integration',
      title: 'Systems Integration',
      description:
        'Connect services and automate workflows to streamline operations and reduce manual effort.',
      icon: '🔗',
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description:
        'Leverage data to inform decisions, measure outcomes, and uncover areas for improvement.',
      icon: '📊',
    },
    {
      id: 'support',
      title: 'Support & Maintenance',
      description:
        'Keep your systems secure, updated, and running smoothly with ongoing support.',
      icon: '🛠️',
    },
  ];

  return (
    <Section
      id="services"
      title="Our Services"
      subtitle="Solutions designed to deliver clarity, performance, and long-term value."
      size="md"
      className=""
    >
      <div className="grid grid-3" role="list">
        {services.map((s) => (
          <article
            key={s.id}
            className="card service-card"
            role="listitem"
            aria-labelledby={`${s.id}-title`}
            tabIndex={0}
          >
            <div className="service-icon" aria-hidden="true">
              <span className="icon-emoji" aria-hidden="true">{s.icon}</span>
            </div>
            <h3 id={`${s.id}-title`} className="h3 service-title">
              {s.title}
            </h3>
            <p className="muted service-desc">{s.description}</p>
          </article>
        ))}
      </div>

      {/* Local styles scoped by .service-card where possible */}
      <style>{`
        .service-card {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 100%;
          outline: none; /* rely on :focus-visible below */
        }
        .service-card:focus-visible {
          box-shadow: var(--shadow-lg), 0 0 0 4px color-mix(in srgb, var(--color-primary) 22%, transparent);
          border-color: color-mix(in srgb, var(--color-primary) 35%, var(--border));
        }
        .service-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--color-primary) 12%, var(--surface));
          border: 1px solid color-mix(in srgb, var(--color-primary) 20%, var(--border));
          box-shadow: var(--shadow-sm);
          margin-bottom: 8px;
        }
        .icon-emoji {
          font-size: 24px;
          line-height: 1;
        }
        .service-title {
          margin-top: 0;
          margin-bottom: 6px;
          line-height: 1.35;
        }
        .service-desc {
          margin: 0;
        }

        /* Responsive adjustments to ensure good spacing in grid */
        @media (min-width: 768px) {
          .service-card {
            padding: var(--space-6);
          }
        }
      `}</style>
    </Section>
  );
}

export default Services;
