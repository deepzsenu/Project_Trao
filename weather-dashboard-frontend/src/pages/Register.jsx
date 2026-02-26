import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  const bgImage =
    "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=2070&auto=format&fit=crop";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 w-full max-w-6xl px-6 gap-10 items-center">

        {/* Welcome Text */}
        <div className="hidden md:block text-white space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Create Your Weather Space ☁
          </h1>
          <p className="text-lg text-gray-200">
            Register to start tracking weather across multiple cities,
            manage favorites, and build your personalized dashboard.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Register
          </h2>

          <input
            placeholder="Name"
            required
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full mb-6 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition active:scale-95">
            Register
          </button>

          <p className="text-sm text-center mt-4">
            Already have account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;