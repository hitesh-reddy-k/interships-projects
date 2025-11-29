import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .dashboard-container {
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }

        .dashboard-card {
          background: white;
          border-radius: 20px;
          padding: 3rem 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 600px;
          width: 100%;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dashboard-card h1 {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          margin-bottom: 1rem;
          font-weight: 800;
        }

        .dashboard-card .user-name {
          color: #764ba2;
          font-weight: 700;
          display: inline-block;
          position: relative;
        }

        .dashboard-card .user-name::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .emoji {
          font-size: 3rem;
          display: inline-block;
          animation: bounce 1s infinite;
          margin-left: 0.5rem;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .welcome-message {
          font-size: 1.2rem;
          color: #666;
          margin-top: 1.5rem;
          line-height: 1.6;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .feature-card {
          background: linear-gradient(135deg, #667eea15, #764ba215);
          padding: 1.5rem;
          border-radius: 12px;
          border: 2px solid #667eea30;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
          border-color: #667eea;
        }

        .feature-card:active {
          transform: translateY(-2px);
        }

        .feature-card .icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .feature-card h3 {
          font-size: 1rem;
          color: #333;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .dashboard-card {
            padding: 2rem 1.5rem;
          }

          .dashboard-card h1 {
            font-size: 1.8rem;
          }

          .emoji {
            font-size: 2rem;
          }

          .welcome-message {
            font-size: 1rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1>
            Welcome <span className="user-name">{user?.name}</span>
            <span className="emoji">🚀</span>
          </h1>
          
          <p className="welcome-message">
            You're successfully logged in! Start creating and organizing your notes with ease.
          </p>

          <div className="feature-grid">
            <div className="feature-card" onClick={() => navigate('/notes')}>
              <div className="icon">📝</div>
              <h3>Create Notes</h3>
            </div>
          
        
          </div>
        </div>
      </div>
    </>
  );
}