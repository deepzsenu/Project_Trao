import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // clear token
    navigate("/login"); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}