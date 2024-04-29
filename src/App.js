import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/login';
import Register from './register/Register';
import Home from './home/home';
import Quiz from './quiz/quiz'

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/home" /> : <Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
