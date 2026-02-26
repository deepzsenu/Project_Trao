import LogoutButton from "./LogoutButton";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-600">
          🌦 Weather Dashboard
        </h1>
        <LogoutButton />
      </header>

      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
};

export default Layout;