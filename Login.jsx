import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/feed");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="w-full max-w-xs">
        <input type="email" placeholder="Email" className="input" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="input mt-2" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="btn-primary mt-4 w-full">Login</button>
      </form>
    </div>
  );
}
