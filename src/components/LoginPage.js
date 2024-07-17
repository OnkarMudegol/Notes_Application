// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function LoginPage({ setLoading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`https://takenotes123backend.onrender.com${endpoint}`, { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        navigate('/main');
      } else {
        setError(response.data.message || 'An unexpected error occurred');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-section">
          <img src="Man.jpg" alt="Man working on laptop" className="illustration" />
          <h1>Keep life simple</h1>
          <p>Store all your notes in a simple and intuitive app that helps you enjoy what is most important in life.</p>
        </div>
        <div className="right-section">
          <img src="Logo.png" alt="Notes.me" className="logo" />
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-button">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;