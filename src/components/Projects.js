import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '🛒'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      tech: ['React', 'Firebase', 'Material-UI'],
      image: '📋'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather visualization with location-based forecasts',
      tech: ['React', 'API Integration', 'Chart.js'],
      image: '🌤️'
    }
  ];

  return (
    <section className="projects-slide">
      <div className="projects-content">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">{project.image}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#" className="project-link">View Demo</a>
                <a href="#" className="project-link">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

