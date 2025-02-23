import React, { useState } from 'react';
import './Portfolio.css';
import PongGame from './App';

const Portfolio: React.FC = () => {
  const [showPongGame, setShowPongGame] = useState<boolean>(false);

  return (
    <div className="portfolio-container">
      <section id="welcome" className="section">
        <h1>Welcome to My Portfolio</h1>
        <p>Hi, I'm a passionate developer. Scroll down to learn more about me!</p>
      </section>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>I'm a software engineer with a love for coding and creating. I specialize in front-end development and enjoy building interactive websites.</p>
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>
        <button onClick={() => setShowPongGame(!showPongGame)}>Start Pong Game</button>
        {showPongGame && <PongGame />}
      </section>

      <section id="resume" className="section">
        <h2>Resume</h2>
        <p>Here is a brief overview of my experience...</p>
      </section>
    </div>
  );
};

export default Portfolio;
