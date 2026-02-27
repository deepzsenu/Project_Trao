import LogoutButton from "./LogoutButton";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const backgrounds = {
  clear: "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=2070&auto=format&fit=crop",
  clouds: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=2070&auto=format&fit=crop",
  rain: "https://images.unsplash.com/photo-1501696461441-9c0b0b87c6d1?q=80&w=2070&auto=format&fit=crop",
  snow: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2070&auto=format&fit=crop",
};

const Layout = ({ children, weatherCondition }) => {
  const { user } = useAuth();

  const getBackground = () => {
    if (!weatherCondition) return backgrounds.clear;

    const condition = weatherCondition.toLowerCase();
    if (condition.includes("cloud")) return backgrounds.clouds;
    if (condition.includes("rain")) return backgrounds.rain;
    if (condition.includes("snow")) return backgrounds.snow;
    return backgrounds.clear;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative transition-all duration-700"
      style={{ backgroundImage: `url(${getBackground()})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col min-h-screen">

        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 flex justify-between items-center px-8 py-4 
                     bg-white/10 backdrop-blur-md border-b border-white/20"
        >
          <div>
            <h1 className="text-xl font-bold text-white">
              🌦 Weather Dashboard
            </h1>
            {user && (
              <p className="text-sm text-gray-300">
                Welcome, {user.name}
              </p>
            )}
          </div>

          <LogoutButton />
        </motion.header>

        <main className="flex-1 max-w-7xl mx-auto w-full p-6 text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;