import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SessionPage = () => {
  const { child } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Mock data of sessions (replace with an API call if needed)
    const mockSessions = ["000", "001", "002"];
    setSessions(mockSessions);
  }, []);

  const handleAnalyze = async (sessionId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/analyze_emotions?child=${child}&session=${sessionId}`);
      const result = await response.json();
      console.log(result);
      alert(`Analysis for session ${sessionId} complete! Check console.`);
    } catch (error) {
      console.error("Error analyzing session:", error);
    }
  };

  return (
    <div>
      <h1>Sessions for {child}</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td>{session}</td>
              <td>
                <button onClick={() => handleAnalyze(session)}>Analyze</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionPage;
