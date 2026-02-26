import LogoutButton from "./LogoutButton";

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
        <header className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white">🌦 Weather Dashboard</h1>
          <LogoutButton />
        </header>

        <main className="max-w-7xl mx-auto p-6 text-white">{children}</main>
      </div>
    </div>
  );
};

export default Layout;