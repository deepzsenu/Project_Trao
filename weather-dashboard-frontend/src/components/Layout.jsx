import LogoutButton from "./LogoutButton";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  const bgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Beautiful_summer_weather_in_Escanaba%2C_MI.jpg/960px-Beautiful_summer_weather_in_Escanaba%2C_MI.jpg?_=20180628205434";

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* 🔥 Modern Header */}
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 
                     bg-white/10 backdrop-blur-md border-b border-white/20"
        >
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌦</div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Weather Dashboard
              </h1>
              <p className="text-xs text-gray-300">
                Your personal weather control center
              </p>
            </div>
          </div>

          {/* Logout */}
          <LogoutButton />
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-6 text-white">
          {children}
        </main>

        {/* Optional Footer */}
        <footer className="text-center text-gray-300 text-sm py-4 bg-black/30 backdrop-blur-sm">
          © {new Date().getFullYear()} Weather Dashboard • Built with React & Tailwind
        </footer>
      </div>
    </div>
  );
};

export default Layout;