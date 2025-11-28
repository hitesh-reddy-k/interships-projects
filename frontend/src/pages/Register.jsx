import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // <- import
import { AuthContext } from "../contexts/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <- hook
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Server Error");
        return;
      }

      const data = await res.json();
      login(data.user, data.token);

      // ✅ redirect to CRUD page
      navigate("/notes"); 
    } catch (err) {
      setError("Cannot connect to server");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={submit}>Register</button>
    </div>
  );
}
