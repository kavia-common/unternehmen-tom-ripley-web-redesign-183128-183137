import React from 'react';
import Section from './Section';

/**
 * PUBLIC_INTERFACE
 * Footer component using the shared Section wrapper.
 *
 * - Semantic <footer> containing company info, quick navigation, and social links
 * - Uses Section wrapper with id="footer" for consistent spacing and theme
 * - Quick links anchor to #home, #services, #team, #contact
 * - Social icons as simple inline SVG placeholders with accessible labels
 * - Includes nav with aria-label and focus-visible styles
 * - Theme-compliant colors using CSS variables from Ocean Professional theme
 */
function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  // Simple inline SVG icon placeholder component
  const Icon = ({ label, path, viewBox = '0 0 24 24' }) => (
    <a
      href="#"
      className="social-link"
      aria-label={label}
      title={label}
      onClick={(e) => e.preventDefault()}
    >
      <svg
        width="20"
        height="20"
        viewBox={viewBox}
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <path d={path} fill="currentColor" />
      </svg>
    </a>
  );

  return (
    <footer className="site-footer" role="contentinfo">
      <Section id="footer" size="sm" className="footer-section">
        <div className="footer-inner">
          {/* Company information */}
          <div className="footer-brand">
            <div className="footer-title h3">Unternehmen Tom Ripley</div>
            <p className="muted footer-desc">
              Modern solutions with ocean‑grade precision. We partner with organizations to deliver clarity, performance, and long‑term value.
            </p>
            <p className="muted footer-copy">
              © {year} Unternehmen Tom Ripley. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="footer-nav" aria-label="Footer quick links">
            <h3 className="h3 footer-heading">Quick Links</h3>
            <ul className="footer-links" role="list">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <a className="footer-link" href={`#${l.id}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="footer-social" aria-label="Social media">
            <h3 className="h3 footer-heading">Follow</h3>
            <div className="social-row">
              {/* Placeholder icons: generic shapes */}
              <Icon
                label="LinkedIn"
                path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.027-3.059-1.865-3.059-1.866 0-2.152 1.459-2.152 2.967v5.696h-3v-10h2.879v1.367h.041c.401-.761 1.379-1.562 2.838-1.562 3.036 0 3.596 2.001 3.596 4.602v5.593z"
              />
              <Icon
                label="Twitter"
                path="M23.953 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.722 0-4.928 2.206-4.928 4.928 0 .386.045.762.127 1.124-4.094-.205-7.722-2.166-10.159-5.144-.424.729-.666 1.576-.666 2.476 0 1.708.87 3.214 2.191 4.099-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.379 4.6 3.419-1.68 1.318-3.809 2.104-6.115 2.104-.398 0-.79-.023-1.175-.069 2.179 1.397 4.768 2.213 7.548 2.213 9.057 0 14.01-7.506 14.01-14.01 0-.213-.006-.425-.016-.636.962-.695 1.797-1.562 2.457-2.549z"
              />
              <Icon
                label="GitHub"
                path="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.244 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.921.43.371.815 1.103.815 2.222 0 1.604-.015 2.896-.015 3.289 0 .319.216.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z"
              />
            </div>
          </div>
        </div>

        {/* Local styles scoped to footer */}
        <style>{`
          .footer-section {
            border-top: 1px solid var(--border);
            background: color-mix(in srgb, var(--surface) 96%, transparent);
          }
          .footer-inner {
            display: grid;
            gap: var(--space-8);
          }
          .footer-brand .footer-title {
            margin: 0 0 4px 0;
          }
          .footer-desc {
            margin: 0 0 8px 0;
            max-width: 60ch;
          }
          .footer-copy {
            margin: 0;
            font-size: 0.95rem;
          }
          .footer-heading {
            margin-bottom: 6px;
          }
          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            gap: 4px;
          }
          .footer-link {
            color: var(--text);
            text-decoration: none;
            padding: 6px 8px;
            border-radius: var(--radius-sm);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: color 0.2s ease, background-color 0.2s ease;
          }
          .footer-link:hover {
            color: var(--color-primary);
            background: color-mix(in srgb, var(--color-primary) 10%, transparent);
          }
          .footer-link:focus-visible {
            outline: 3px solid color-mix(in srgb, var(--color-primary) 60%, white);
            outline-offset: 2px;
          }

          .footer-social .social-row {
            display: inline-flex;
            gap: 8px;
          }
          .social-link {
            width: 36px;
            height: 36px;
            border-radius: var(--radius-md);
            border: 1px solid var(--border);
            background: var(--surface);
            color: var(--text);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-sm);
            transition: transform 0.15s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          }
          .social-link:hover {
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
            color: var(--color-primary);
            border-color: color-mix(in srgb, var(--color-primary) 35%, var(--border));
            background: color-mix(in srgb, var(--color-primary) 6%, var(--surface));
          }
          .social-link:focus-visible {
            outline: 3px solid color-mix(in srgb, var(--color-primary) 60%, white);
            outline-offset: 2px;
          }

          @media (min-width: 768px) {
            .footer-inner {
              grid-template-columns: 2fr 1fr 1fr;
              align-items: start;
            }
          }
        `}</style>
      </Section>
    </footer>
  );
}

export default Footer;
