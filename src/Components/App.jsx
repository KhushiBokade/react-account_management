import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";        // correct import
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <AuthProvider>                         {/* ←←← THIS ONE, NOT <Provider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}