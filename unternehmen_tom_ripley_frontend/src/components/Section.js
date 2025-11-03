import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Section component provides consistent vertical spacing, width constraints, and optional
 * visual variants for app sections (hero, services, team, contact, etc.).
 *
 * Props:
 * - id: string (optional) - anchors the section for in-page navigation (e.g., #services)
 * - title: string (optional) - section heading
 * - subtitle: string (optional) - supporting subtitle/description
 * - children: ReactNode - content of the section
 * - size: 'sm' | 'md' | 'lg' - controls vertical padding (default: 'md')
 * - surface: boolean - if true, section background uses a surface card style
 * - hero: boolean - if true, applies hero gradient background and larger spacing
 * - className: string - extra classes for customization
 *
 * Accessibility:
 * - Renders a semantic <section> with optional aria-labelledby if title present.
 */
// PUBLIC_INTERFACE
function Section({
  id,
  title,
  subtitle,
  children,
  size = 'md',
  surface = false,
  hero = false,
  className = '',
}) {
  // Compute padding size class
  const sizeClass =
    size === 'lg' ? 'section section-lg' : size === 'sm' ? 'section section-sm' : 'section';

  // Background variants
  const bgClass = hero ? 'hero-surface' : surface ? 'surface' : '';

  // Build the final class list
  const classes = [sizeClass, bgClass, className].filter(Boolean).join(' ');

  // Generate aria-labelledby if a title is provided
  const headingId = title ? `${id || 'section'}-heading` : undefined;

  return (
    <section id={id} className={classes} aria-labelledby={headingId}>
      <div className="container">
        {title && (
          <header style={{ marginBottom: '16px' }}>
            <h2 id={headingId} className="h2">{title}</h2>
            {subtitle && <p className="muted">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  surface: PropTypes.bool,
  hero: PropTypes.bool,
  className: PropTypes.string,
};

export default Section;
