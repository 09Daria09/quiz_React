import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './home.css';
import globeIcon from './1.jpg';
import Results from '../results/results';

function Home() {
  const [showResults, setShowResults] = useState(false);

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div className="home-container">
      <nav className="top-menu">
        <button onClick={toggleResults} className="menu-item">Топ 10</button>
        <Link to="/change-password" className="menu-item">Смена пароля</Link>
      </nav>
      <h1 className="home-title">Викторина: Столицы Мира</h1>
      <img src={globeIcon} alt="Globe" className="home-globe-icon" />
      <p className="home-text">Тест на знание столиц стран мира. Готовы начать?</p>
        <Link to="/quiz" className="home-link">Начать викторину</Link> 
      {showResults && <Results />}
    </div>
  );
}

export default Home;
