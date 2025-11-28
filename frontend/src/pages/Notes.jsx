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

  // Load all notes
  async function loadNotes() {
    try {
      const res = await fetch(`${API}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
      setError("Could not load notes");
    }
  }

  // Add a new note
  async function add() {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }
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
    }
  }

  // Delete a note
  async function remove(id) {
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
    <div className="card">
      <h2>Your Notes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={add}>Add Note</button>

      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            <strong>{n.title}</strong>: {n.content}{" "}
            <button onClick={() => remove(n._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
