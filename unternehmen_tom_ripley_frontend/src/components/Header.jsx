import React, { useEffect, useRef, useState, useCallback } from 'react';
import logo from '../assets/logo.svg';

/**
 * PUBLIC_INTERFACE
 * Header component for the Ocean Professional themed single-page site.
 *
 * Features:
 * - Visually-hidden Skip to content link that appears on focus and targets #home
 * - Fixed top navigation bar styled with theme variables
 * - Brand area with logo and site title
 * - Desktop navigation links to #home, #services, #team, #contact
 * - Mobile hamburger menu that toggles a slide-down menu
 * - Smooth scroll fallback via scrollIntoView({ behavior: 'smooth' })
 * - IntersectionObserver to set aria-current="page" on the active section link
 * - Theme toggle integration via onThemeToggle callback (optional). If not provided,
 *   toggles [data-theme] on documentElement between light and dark.
 *
 * Accessibility:
 * - Skip link appears on keyboard focus
 * - Hamburger has aria-expanded/aria-controls and toggles focus trapping
 * - Nav has role="navigation" and aria-label
 * - Escape closes the menu
 *
 * Props:
 * - onThemeToggle?: () => void
 */
function Header({ onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const sectionIds = ['home', 'services', 'team', 'contact'];

  // Smooth scroll fallback on click
  const handleNavClick = useCallback((e, id) => {
    const href = `#${id}`;
    // If anchor exists, prevent default and smooth scroll.
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {
        // Fallback without options for older browsers
        el.scrollIntoView();
      }
      setMenuOpen(false);
      // Move focus to the section heading for a11y context if found
      const heading = el.querySelector('h1, h2, [role="heading"]');
      if (heading) heading.focus?.();
      // Update URL hash without jumping
      if (window.history && typeof window.history.pushState === 'function') {
        window.history.pushState(null, '', href);
      } else {
        window.location.hash = href;
      }
    }
  }, []);

  // IntersectionObserver to determine active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry with largest intersection ratio currently intersecting
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && visible.target && visible.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        // Root is viewport; use rootMargin to trigger a bit earlier
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    targets.forEach((t) => observer.observe(t));

    return () => {
      observer.disconnect();
    };
    // sectionIds is stable; we only want to run once on mount ideally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Theme toggle handler
  const handleThemeToggle = useCallback(() => {
    if (typeof onThemeToggle === 'function') {
      onThemeToggle();
      return;
    }
    // Fallback to toggling data-theme on the documentElement
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
  }, [onThemeToggle]);

  // Compute classes
  const headerClasses = 'site-header';
  const containerClasses = 'container header-inner';
  const brandClasses = 'brand';
  const navClasses = 'nav';
  const desktopNavClasses = 'nav-desktop';
  const mobileNavWrapperClasses = `nav-mobile ${menuOpen ? 'open' : ''}`;
  const hamburgerBtnClasses = 'hamburger-btn btn';

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#home"
        className="skip-link"
        onClick={(e) => handleNavClick(e, 'home')}
      >
        Skip to content
      </a>

      {/* Fixed header */}
      <header className={headerClasses}>
        <div className={containerClasses}>
          {/* Brand */}
          <div className={brandClasses}>
            <img src={logo} alt="" aria-hidden="true" className="brand-logo" />
            <a
              href="#home"
              className="brand-title"
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Unternehen Tom Ripley
            </a>
          </div>

          {/* Desktop navigation */}
          <nav
            className={`${navClasses} ${desktopNavClasses}`}
            role="navigation"
            aria-label="Primary"
            ref={navRef}
          >
            {sectionIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="nav-link"
                aria-current={activeId === id ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, id)}
              >
                {id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <button
              type="button"
              className="btn btn-secondary theme-toggle-inline"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              Theme
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="header-actions">
            <button
              type="button"
              className={hamburgerBtnClasses}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="hamburger-icon" aria-hidden="true">
                ☰
              </span>
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={mobileNavWrapperClasses}
          role="navigation"
          aria-label="Mobile Primary"
          ref={mobileMenuRef}
        >
          <div className="container nav-mobile-inner">
            <div className="nav-mobile-links">
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="nav-link"
                  aria-current={activeId === id ? 'page' : undefined}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary theme-toggle-inline"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              Theme
            </button>
          </div>
        </div>
      </header>

      {/* Inline styles specific to header (scoped by class names) */}
      <style>{`
        .skip-link {
          position: absolute;
          left: -9999px;
          top: 0;
          background: var(--color-primary);
          color: #fff;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          z-index: 10000;
          text-decoration: none;
          transition: left 0.2s ease, transform 0.2s ease;
        }
        .skip-link:focus {
          left: 12px;
          transform: translateY(12px);
          box-shadow: 0 0 0 3px color-mix(in srgb, white 80%, var(--color-primary));
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 999;
          background: color-mix(in srgb, var(--surface) 92%, transparent);
          backdrop-filter: saturate(160%) blur(6px);
          border-bottom: 1px solid var(--border);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 64px;
          gap: 16px;
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .brand-logo {
          width: 32px;
          height: 32px;
        }
        .brand-title {
          color: var(--text);
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }
        .brand-title:hover, .brand-title:focus {
          color: color-mix(in srgb, var(--color-primary) 60%, var(--text));
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-desktop {
          display: none;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hamburger-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 8px 12px;
        }
        .hamburger-icon {
          font-size: 20px;
          line-height: 1;
        }

        /* Mobile menu */
        .nav-mobile {
          display: block;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s ease;
          border-bottom: 1px solid transparent;
          background: var(--surface);
        }
        .nav-mobile.open {
          max-height: 500px; /* Enough to show links */
          border-bottom-color: var(--border);
          box-shadow: var(--shadow-sm) inset;
        }
        .nav-mobile-inner {
          display: grid;
          gap: 12px;
          padding-top: 8px;
          padding-bottom: 12px;
        }
        .nav-mobile-links {
          display: grid;
          gap: 4px;
        }

        /* Active link state via aria-current */
        .nav-link[aria-current="page"] {
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 10%, transparent);
        }

        /* Desktop layout */
        @media (min-width: 768px) {
          .nav-desktop {
            display: flex;
          }
          .header-actions {
            display: none;
          }
          .nav-mobile {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
