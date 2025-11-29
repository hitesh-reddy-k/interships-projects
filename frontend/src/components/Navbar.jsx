import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <style>{`
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav a:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .nav a.logo {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .nav button {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 0.5rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .nav button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav button:active {
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .nav {
            padding: 1rem;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .nav a, .nav button {
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
          }

          .nav a.logo {
            font-size: 1.2rem;
          }
        }
      `}</style>
      
      <nav className="nav">
        <Link to="/" className="logo">📝 Notes</Link>
        
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/notes">My Notes</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}