import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          No account? <Link to="/register" className="text-indigo-600">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;