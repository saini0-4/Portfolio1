import React from 'react';
import './About.css';

const About = () => {
  const skills = [
    'React', 'JavaScript', 'Node.js', 'Python',
    'CSS', 'HTML'
  ];

  return (
    <section className="about-slide">
      <div className="about-content">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Motivated and detail-oriented web developer with expertise in front-end technologies including HTML, CSS, JavaScript.. Proficient in building responsive, interactive user interfaces and currently expanding my knowledge to develop scalable and dynamic web developer.
            </p>
            <p>
              My journey in web development started with a curiosity about
              how websites work, and it has evolved into a career focused on
              building scalable, user-friendly applications.
            </p>
          </div>
          <div className="about-skills">
            <h3>Skills & Technologies</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

