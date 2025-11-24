import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const slides = [
    { id: 0, component: <Hero /> },
    { id: 1, component: <About /> },
    { id: 2, component: <Projects /> },
    { id: 3, component: <Contact /> }
  ];

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [totalSlides]);

  return (
    <div className="App">
      <div className="slides-container">
        <div 
          className="slides-wrapper"
          style={{ transform: `translateX(-${currentSlide * 25}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              {slide.component}
            </div>
          ))}
        </div>
      </div>
      
      <Navigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        goToSlide={goToSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    </div>
  );
}

export default App;
