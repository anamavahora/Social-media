import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert("Registered! Please login.");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleRegister} className="w-full max-w-xs">
        <input type="text" placeholder="Username" className="input" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" className="input mt-2" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="input mt-2" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="btn-primary mt-4 w-full">Register</button>
      </form>
    </div>
  );
}
