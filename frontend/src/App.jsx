import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  );
}

export default App;