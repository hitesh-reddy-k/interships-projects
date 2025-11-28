import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await fetch(`${API}/user/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Login failed");
        return;
      }

      const data = await res.json();
      if (data.token) {
        login(data.user, data.token);
        navigate("/notes"); // Redirect to Notes page
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={submit}>Login</button>
    </div>
  );
}
  