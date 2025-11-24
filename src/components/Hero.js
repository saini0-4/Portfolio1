import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-slide">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-greeting">Hello, I'm</span>
          <span className="hero-name">Saini Bhatt</span>
          <span className="hero-role">Frontend Developer</span>
        </h1>
        
        <div className="hero-buttons">
          <button className="btn btn-primary">View My Work</button>
          <button className="btn btn-secondary">Get In Touch</button>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;

