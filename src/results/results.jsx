import React, { useEffect, useState } from 'react';
import './results.css'
const Results = () => {
    const [results, setResults] = useState([]);
  
    useEffect(() => {
      const loadedResults = JSON.parse(localStorage.getItem('quizResults')) || [];
      setResults(loadedResults);
    }, []);

  const formatDuration = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes} мин ${seconds} сек`;
  };
  

  return (
    <div className="results-container">
      <h2>Топ 10 результатов</h2>
      <ol>
        {results.map((result, index) => (
          <li key={index}>
            {result.username} - Счёт: {result.score}, Время: {formatDuration(result.time)}
          </li>
        ))}
      </ol>
    </div>
  );
  
};

export default Results;
