import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

// Helper function to check if user is logged in
const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route "/" */}
        <Route
          path="/"
          element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Dashboard Route (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect unknown routes to "/" */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;