/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "../styles/StartScreen.css";

const StartScreen = ({ onStartQuiz, onAdminLogin }) => {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [childName, setChildName] = useState('');

  const correctAdminId = "123";
  const correctAdminPassword = "123";

  const handlePlayGame = (e) => {
    e.preventDefault();
    if (childName.trim() !== '') {
      const sessionId = uuidv4(); // Generate unique session ID using UUID
      onStartQuiz(childName, sessionId);
    }
  };

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (adminId === correctAdminId && adminPassword === correctAdminPassword) {
      onAdminLogin();
    } else {
      setLoginError("Incorrect Admin ID or Password.");
    }
  };

  return (
    <div className="start-screen">
      <h1>The React Quiz Game</h1>
      <form onSubmit={handlePlayGame}>
        <label htmlFor="childName">Enter child name:</label>
        <input 
          type="text" 
          id="childName" 
          name="childName" 
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleAdminLoginClick}>ADMIN LOGIN</button>

      {showAdminLogin && (
        <div className="admin-login-form">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLoginSubmit}>
            <div className="input-group">
              <label htmlFor="adminId">Admin ID:</label>
              <input
                type="text"
                id="adminId"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="adminPassword">Password:</label>
              <input
                type="password"
                id="adminPassword"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
            {loginError && <p className="error-message">{loginError}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
