import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Service from "./pages/Service/Service";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";
import Booking from "./pages/Booking/Booking";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";
import ServiceManagement from "./pages/Admin/Services";
import AdminPage from "./pages/Admin/AdminPage";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <div className="app-main">
          <header className="navbar">
            <div className="logo">CarCareHome</div>
            <nav>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
              <a href="/services">Services</a>
            </nav>
          </header>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPage />} caseSensitive>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="services" element={<ServiceManagement />} />
              <Route index element={<Navigate to="services" replace />} />
            </Route>
            <Route path="/services" element={<Service />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/service" element={<Navigate to="/services" replace />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/" element={<Navigate to="/services" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>

  );
}


export default App;
