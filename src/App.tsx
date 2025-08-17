import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import TradingSection from './components/TradingSection';
import TechnologiesCarousel from './components/TechnologiesCarousel';
import Footer from './components/Footer';
import About from './components/About';
import Career from './components/Career';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <section id="home">
                <Hero />
              </section>
              <section id="services">
                <ServicesSection />
              </section>
              <section id="career">
                <TradingSection />
              </section>
              <section id="contact">
                <TechnologiesCarousel />
              </section>
              <Footer />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;