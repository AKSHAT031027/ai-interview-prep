import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../Dashboard.css';
import '../DsaSheet.css';

function DsaSheet() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dsa', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProblems(response.data);
    } catch (error) {
      console.log('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSolved = async (problemId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/dsa/toggle/${problemId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProblems(problems.map((p) =>
        p._id === problemId ? { ...p, solved: !p.solved } : p
      ));
    } catch (error) {
      console.log('Error toggling problem:', error);
    }
  };

  if (loading) {
    return <div className="dashboard-page"><p style={{ padding: '32px', color: '#8b949e' }}>Loading...</p></div>;
  }

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="dashboard-brand">{'</>'} AI INTERVIEW PREP</div>
        <div className="dashboard-nav-right">
          <Link to="/dashboard" className="dsa-back-link">← Dashboard</Link>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1 className="dashboard-heading">DSA Sheet</h1>
        <p className="dashboard-subheading">
          {problems.filter(p => p.solved).length} / {problems.length} solved
        </p>

        <div className="dsa-list">
          {problems.map((problem) => (
            <div key={problem._id} className="dsa-row">
              <input
                type="checkbox"
                checked={problem.solved}
                onChange={() => toggleSolved(problem._id)}
                className="dsa-checkbox"
              />
              <span className={`dsa-title ${problem.solved ? 'dsa-title-solved' : ''}`}>
                {problem.title}
              </span>
              <span className="dsa-topic">{problem.topic}</span>
              <span className={`dsa-difficulty dsa-difficulty-${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </span>
              <a href={problem.link} target="_blank" rel="noopener noreferrer" className="dsa-link">
                Solve →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DsaSheet;