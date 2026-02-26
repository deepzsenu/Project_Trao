import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info from localStorage (or API if you have a /me endpoint)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsername(JSON.parse(storedUser).name);
    } else {
      // Redirect to login if no user info
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-indigo-600 text-white shadow">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
          <Link to="/dashboard">
            <h1 className="text-xl font-bold hover:text-gray-200 transition">
              Weather Dashboard
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            {username && <span className="font-medium">Hello, {username}</span>}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto p-6 w-full">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 p-4 mt-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Weather Dashboard. All rights reserved.
      </footer>
    </div>
  );
}