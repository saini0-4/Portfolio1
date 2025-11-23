import React from 'react';
import './Navigation.css';

const Navigation = ({ currentSlide, totalSlides, goToSlide, nextSlide, prevSlide }) => {
  return (
    <div className="navigation">
      {/* Previous/Next Buttons */}
      <button 
        className="nav-button nav-button-prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ←
      </button>
      <button 
        className="nav-button nav-button-next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        →
      </button>

      {/* Slide Dots */}
      <div className="slide-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Labels */}
      <div className="slide-labels">
        <span className={currentSlide === 0 ? 'active' : ''}>Hero</span>
        <span className={currentSlide === 1 ? 'active' : ''}>About</span>
        <span className={currentSlide === 2 ? 'active' : ''}>Projects</span>
        <span className={currentSlide === 3 ? 'active' : ''}>Contact</span>
      </div>
    </div>
  );
};

export default Navigation;

