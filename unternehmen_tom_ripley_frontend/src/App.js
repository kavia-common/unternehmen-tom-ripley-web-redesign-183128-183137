import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Ensure smooth scroll behavior; CSS already sets html { scroll-behavior: smooth }.
  // Provide a JS fallback for Safari/older browsers during hash navigation.
  useEffect(() => {
    const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;

    const handleHashChange = (e) => {
      const hash = window.location.hash?.replace('#', '');
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;

      // If smooth behavior not supported, prevent default jump and perform JS scroll
      if (!supportsSmoothScroll) {
        e?.preventDefault?.();
        try {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
        } catch {
          target.scrollIntoView();
        }
      }
    };

    // Run on initial load if URL has a hash
    if (!supportsSmoothScroll && window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange, false);
    return () => window.removeEventListener('hashchange', handleHashChange, false);
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      {/* Fixed header with navigation */}
      <Header onThemeToggle={toggleTheme} />

      {/* Page sections in required order with correct IDs provided by each component:
          - Hero -> id="home"
          - Services -> id="services"
          - Team -> id="team"
          - ContactForm -> id="contact"
          Footer section has id="footer" internally.
      */}
      <main id="main-content" role="main">
        <Hero />
        <Services />
        <Team />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;
