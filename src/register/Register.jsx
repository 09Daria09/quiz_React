import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Register.css';

function RegisterForm({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || username.length < 4) {
      setError('Username должен быть больше 4 символов ');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password должен быть больше 6 символов ');
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    setAuth(true);
    setRedirectToHome(true);
  };

  if (redirectToHome) {
    return <Navigate to="/home" replace={true} />;
  }

  return (
    <div className="register-container">
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" className="input-field" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="input-field" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="date" className="input-field" placeholder="Birth Date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        <button type="submit" className="button">Register</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
    </div>
  );
}

export default RegisterForm;
