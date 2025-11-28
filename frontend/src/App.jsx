import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Notes from "./pages/Notes"; 

export default function App() {
  return (
    <Routes>
      <Route path="/Register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
  );
}
