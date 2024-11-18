/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import StartScreen from './StartScreen';
import Quiz from './Quiz';
import AnimalGame from './AnimalGame';
import MemoryGame from './MemoryGame';
import Report from './Report';
import '../styles/App.css';

function App() {
  const [gameStage, setGameStage] = useState('start');
  const [isAdmin, setIsAdmin] = useState(false);
  const [childName, setChildName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [currentSessionData, setCurrentSessionData] = useState({
    quizScores: [],
    animalGameScore: 0,
    memoryGameScore: 0,
    expressionTally: { quiz: 0, animalGame: 0, memoryGame: 0 }
  });
  const [allSessions, setAllSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleStartQuiz = (name, sid) => {
    setChildName(name);
    setSessionId(sid);
    setCurrentSessionData({
      quizScores: [],
      animalGameScore: 0,
      memoryGameScore: 0,
      expressionTally: { quiz: 0, animalGame: 0, memoryGame: 0 }
    });
    setGameStage('quiz');
  };

  const handleQuizEnd = (score, expressionTally) => {
    setCurrentSessionData(prev => ({
      ...prev,
      quizScores: [...prev.quizScores, score],
      expressionTally: { ...prev.expressionTally, quiz: expressionTally }
    }));
    setGameStage('animalGame');
  };

  const handleAnimalGameEnd = (score, expressionTally) => {
    setCurrentSessionData(prev => ({
      ...prev,
      animalGameScore: score,
      expressionTally: { ...prev.expressionTally, animalGame: expressionTally }
    }));
    setGameStage('memoryGame');
  };

  const handleMemoryGameEnd = (score, expressionTally) => {
    const completedSessionData = {
      ...currentSessionData,
      sessionId,
      childName,
      memoryGameScore: score,
      expressionTally: { ...currentSessionData.expressionTally, memoryGame: expressionTally }
    };

    setAllSessions(prev => [...prev, completedSessionData]);
    setGameStage('start');
    setChildName('');
    setSessionId('');
  };

  const handleViewSessionReport = (session) => {
    setSelectedSession(session);
  };

  const handleBackToStart = () => {
    setGameStage('start');
    setSelectedSession(null);
    setIsAdmin(false);
  };

  return (
    <div className="app">
      {isAdmin ? (
        <Report
          allSessions={allSessions}
          selectedSession={selectedSession}
          onViewSessionReport={handleViewSessionReport}
          onBackToHome={handleBackToStart}
        />
      ) : (
        <>
          {gameStage === 'start' && (
            <StartScreen onStartQuiz={handleStartQuiz} onAdminLogin={handleAdminLogin} />
          )}
          {gameStage === 'quiz' && (
            <Quiz onQuizEnd={handleQuizEnd} childName={childName} sessionId={sessionId} />
          )}
          {gameStage === 'animalGame' && (
            <AnimalGame onFinish={handleAnimalGameEnd} childName={childName} sessionId={sessionId} />
          )}
          {gameStage === 'memoryGame' && (
            <MemoryGame onFinish={handleMemoryGameEnd} childName={childName} sessionId={sessionId} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
