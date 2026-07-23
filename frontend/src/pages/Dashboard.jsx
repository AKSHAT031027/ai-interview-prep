import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="dashboard-brand">{'</>'} AI INTERVIEW PREP</div>
        <div className="dashboard-nav-right">
          <span className="dashboard-username">{user?.name}</span>
          <button className="dashboard-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1 className="dashboard-heading">Welcome, {user?.name}</h1>
        <p className="dashboard-subheading">Your prep hub — DSA sheet, notes, and mock interviews all in one place.</p>

        <div className="dashboard-grid">
          <Link to="/dsa" className="dashboard-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>DSA Sheet</h3>
            <p>Track your problem-solving progress</p>
          </Link>
          <div className="dashboard-card">
            <h3>Notes</h3>
            <p>Your saved study notes</p>
          </div>
          <div className="dashboard-card">
            <h3>Mock Interviews</h3>
            <p>Practice common interview questions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;