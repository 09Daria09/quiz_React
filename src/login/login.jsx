import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      console.log('Login successful:', username);
      setAuth(true);
    } else {
      console.log('Login failed:', username);
      setError('Неправильный логин или пароль. Если вы еще не зарегистрированы, пожалуйста, зарегистрируйтесь.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" className="input-field" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" className="input-field" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="link">Не зарегистрированы? <Link to="/register">Регистрация</Link></p>
      </div>
    </div>
  );
}

export default Login;
