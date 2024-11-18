// SessionReport.js
import React from 'react';

function SessionReport({ session, onBackToReport }) {
  return (
    <div>
      <h2>Session ID: {session.sessionId}</h2>
      <div>
        <h3>Scores and Expression Tally by Activity</h3>
        {/* Render your charts or tables here based on the session data */}
        <p>Quiz Score: {session.quizScores.reduce((a, b) => a + b, 0)}</p>
        <p>Animal Game Score: {session.animalGameScore}</p>
        <p>Memory Game Score: {session.memoryGameScore}</p>
        {/* You might render more details here, as shown in your screenshot */}
      </div>
      <button onClick={onBackToReport}>Close Report</button>
    </div>
  );
}

export default SessionReport;
