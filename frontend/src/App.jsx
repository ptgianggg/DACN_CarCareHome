import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
import Register from "./pages/Register";
import Service from "./pages/Service/Service";
import ServiceList from "./pages/ServiceList/ServiceList";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";
import Booking from "./pages/Booking/Booking";

function App() {
  return (
    <BrowserRouter>
      <div className="app-main">
        <header className="navbar">
          <div className="logo">CarCareHome</div>
          <nav>
            <a href="/service">Services</a>
            <a href="/">Home</a>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<Navigate to="/service" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/service" element={<Service />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </BrowserRouter>
=======
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
>>>>>>> 3532084bd38e2370e0bf7cf5e5304cc9bc0e2d11
  );
}

export default App;