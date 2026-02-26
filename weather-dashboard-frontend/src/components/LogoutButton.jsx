import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
    >
      Logout
    </button>
  );
};

export default LogoutButton;