import React, { useState, useEffect } from 'react';
import './quiz.css';
import { useNavigate } from 'react-router-dom';


const Quiz = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [endTime, setEndTime] = useState(null);


  useEffect(() => {
    if (timerActive) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [timerActive]);
  
  useEffect(() => {
    if (questions.length && !isLoading && !timerActive) {
      setStartTime(new Date());
      setCurrentTime(new Date());
      setTimerActive(true);
    }
  }, [questions, isLoading]);
  
  const formatTime = (startTime, currentTime) => {
    const delta = currentTime - startTime;
    const seconds = Math.floor((delta / 1000) % 60);
    const minutes = Math.floor((delta / 1000 / 60) % 60);
    const hours = Math.floor(delta / 1000 / 60 / 60);
  
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
    
  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setIsLoading(false);
        const total = data.reduce((acc, question) => acc + question.answerOptions.filter(opt => opt.isCorrect).length, 0);
        setTotalCorrect(total);
      })
      .catch(error => {
        console.error('Ошибка при загрузке вопросов:', error);
        setIsLoading(false);
      });
  }, []);

  const calculateScore = () => {
    const currentAnswers = questions[currentQuestion].answerOptions;
    let questionScore = 0;

    currentAnswers.forEach((option, index) => {
      if (option.isCorrect && selectedAnswers.includes(index)) {
        questionScore += 1;
      } else if (!option.isCorrect && selectedAnswers.includes(index)) {
        questionScore -= 1;
      }
    });

    return Math.max(questionScore, 0);
  };

  const handleExitQuiz = () => {
    restartQuiz();
    navigate('/Home'); 
  };
  
  const handleNextQuestion = () => {
    const questionScore = calculateScore();
    setScore(prevScore => prevScore + questionScore);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswers([]);
    } else {
      setQuizFinished(true);
      setQuizFinished(true);
    setTimerActive(false);
    setEndTime(new Date()); 
    saveResults();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswers([]);
    }
  };
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScore(0);
    setQuizFinished(false);
    setEndTime(null); 
    setTimerActive(false); 
    setTimeout(() => {
      setStartTime(new Date());
      setCurrentTime(new Date());
      setTimerActive(true); 
    }, 100);
  };
  const saveResults = () => {
    const endTime = new Date();
    const duration = endTime - startTime;
    const username = localStorage.getItem('username') || 'Анонимный игрок';
  
    const result = {
      username: username,
      score: score,
      totalCorrect: totalCorrect,
      time: duration,
      date: endTime.toLocaleString()
    };
  
    let results = JSON.parse(localStorage.getItem('quizResults')) || [];
    results.push(result);
    results.sort((a, b) => b.score - a.score || a.time - b.time); 
    results = results.slice(0, 10); 
    localStorage.setItem('quizResults', JSON.stringify(results));
  };
  

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (!questions.length) {
    return <div>No questions found!</div>;
  }

  if (quizFinished) {
    return (
      <div className="quiz-container" style={{ position: 'relative' }}> 
    <button onClick={handleExitQuiz} className="exit-button">Выход</button> 
        <h1 className="quiz-title">Викторина завершена!</h1>
        <div className="time-info">
        <p>Ваш итоговый счёт: {score} из {totalCorrect} возможных.</p>
          Общее время: <span>{formatTime(startTime, endTime)}</span>
        </div>
        <button onClick={restartQuiz} className="quiz-button">Повторить викторину</button>
      </div>
    );
  }
  
  
  return (
    <div className="quiz-container" style={{ position: 'relative' }}> 
    <button onClick={handleExitQuiz} className="exit-button">Выход</button> 
 <div className="quiz-timer">
      Время: <span>{formatTime(startTime, currentTime)}</span>
    </div>
      <h1 className="quiz-title">{questions[currentQuestion].questionText}</h1>
      <div>
        {questions[currentQuestion].answerOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswers(prev => [...prev, index])}
            className={`quiz-answer-button ${selectedAnswers.includes(index) ? 'selected' : ''}`}
          >
            {option.answerText}
          </button>
        ))}
      </div>
      <div className="quiz-navigation">
        {currentQuestion > 0 && (
          <button onClick={handlePreviousQuestion} className="quiz-button">Предыдущий вопрос</button>
        )}
        <button onClick={handleNextQuestion} className="quiz-button">
          {currentQuestion < questions.length - 1 ? "Следующий вопрос" : "Завершить викторину"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
