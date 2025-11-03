import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      {/* Fixed header with navigation */}
      <Header onThemeToggle={toggleTheme} />

      {/* Hero section */}
      <main id="main-content">
        <Hero />
        {/* Placeholder anchors to satisfy nav links until other sections are built */}
        <section id="services" className="section">
          <div className="container">
            <h2 className="h2">Services</h2>
            <p className="muted">Our service overview will appear here.</p>
          </div>
        </section>
        <section id="team" className="section surface">
          <div className="container">
            <h2 className="h2">Team</h2>
            <p className="muted">Meet the team section is coming soon.</p>
          </div>
        </section>
        <section id="contact" className="section">
          <div className="container">
            <h2 className="h2">Contact</h2>
            <p className="muted">Get in touch using the form we will add here.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
