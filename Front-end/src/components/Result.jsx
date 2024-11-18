/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function Result({ sessionId, quizScore, animalGameScore, memoryGameScore, onBackToStart }) {
  return (
    <div className="result">
      {/* <h2>Session ID: {sessionId}</h2> */}
      <h3>Results</h3>
      <ul>
        <li>Quiz Total Score: {quizScore}</li>
        <li>Animal Game Score: {animalGameScore}</li>
        <li>Memory Game Score: {memoryGameScore}</li>
      </ul>
      
      {/* Go Back to Start button */}
      <button onClick={() => onBackToStart()}>Go Back to Start Screen</button>
    </div>
  );
}

export default Result;
