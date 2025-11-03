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

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      {/* Fixed header with navigation */}
      <Header onThemeToggle={toggleTheme} />

      {/* Page sections */}
      <main id="main-content">
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
