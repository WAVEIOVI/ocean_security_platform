import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Sites from "./pages/Sites";
import Equipment from "./pages/Equipment";
import Missions from "./pages/Missions";
import Reports from "./pages/Reports";
import Certificates from "./pages/Certificates";
import Support from "./pages/Support";
import Login from "./pages/Login";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="sites" element={<Sites />} />
              <Route path="equipment" element={<Equipment />} />
              <Route path="missions" element={<Missions />} />
              <Route path="reports" element={<Reports />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="support" element={<Support />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
