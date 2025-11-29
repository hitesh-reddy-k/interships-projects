import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Set your backend base URL
export const API = "http://localhost:3000/api/v1";

export default function Notes() {
  const { token } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Load all notes
  async function loadNotes() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not load notes");
    } finally {
      setLoading(false);
    }
  }

  // Add a new note
  async function add() {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }
    setIsAdding(true);
    try {
      const res = await fetch(`${API}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to add note");
      setTitle("");
      setContent("");
      setError("");
      loadNotes();
    } catch (err) {
      console.error(err);
      setError("Could not add note");
    } finally {
      setIsAdding(false);
    }
  }

  // Delete a note
  async function remove(id) {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch(`${API}/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete note");
      loadNotes();
    } catch (err) {
      console.error(err);
      setError("Could not delete note");
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <>
      <style>{`
        .notes-container {
          min-height: calc(100vh - 80px);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }

        .notes-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .notes-header {
          text-align: center;
          color: white;
          margin-bottom: 2rem;
        }

        .notes-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .notes-header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .add-note-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          margin-bottom: 2rem;
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .add-note-card h3 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .error-message {
          background: #fee;
          border: 1px solid #fcc;
          color: #c33;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .input-group label {
          display: block;
          color: #555;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .add-note-card input,
        .add-note-card textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
          font-family: inherit;
        }

        .add-note-card textarea {
          min-height: 120px;
          resize: vertical;
        }

        .add-note-card input:focus,
        .add-note-card textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .add-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
        }

        .add-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .add-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .note-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .note-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .note-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .note-card h4 {
          font-size: 1.25rem;
          color: #333;
          margin-bottom: 0.75rem;
          font-weight: 700;
          word-break: break-word;
        }

        .note-card p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1rem;
          word-break: break-word;
        }

        .note-actions {
          display: flex;
          justify-content: flex-end;
        }

        .delete-btn {
          background: #ff4757;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .delete-btn:hover {
          background: #ee5a6f;
          transform: scale(1.05);
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: white;
        }

        .empty-state .icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.8;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3rem;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .notes-container {
            padding: 1rem;
          }

          .notes-header h2 {
            font-size: 2rem;
          }

          .add-note-card {
            padding: 1.5rem;
          }

          .notes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="notes-container">
        <div className="notes-wrapper">
          <div className="notes-header">
            <h2>📝 Your Notes</h2>
            <p>Create, organize, and manage your thoughts</p>
          </div>

          <div className="add-note-card">
            <h3>✨ Create New Note</h3>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isAdding}
              />
            </div>

            <div className="input-group">
              <label>Content</label>
              <textarea
                placeholder="Write your note content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isAdding}
              />
            </div>

            <button className="add-btn" onClick={add} disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Note"}
            </button>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : notes.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📭</div>
              <h3>No notes yet</h3>
              <p>Create your first note to get started!</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((n) => (
                <div key={n._id} className="note-card">
                  <h4>{n.title}</h4>
                  <p>{n.content}</p>
                  <div className="note-actions">
                    <button className="delete-btn" onClick={() => remove(n._id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}