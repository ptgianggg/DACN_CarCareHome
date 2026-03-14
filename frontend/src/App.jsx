import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ServiceList from "./pages/ServiceList/ServiceList";
import Booking from "./pages/Booking/Booking";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Admin/Dashboard";
import ServiceManagement from "./pages/Admin/Services";
import BookingManagement from "./pages/Admin/Bookings";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminPage from "./pages/Admin/AdminPage";
import CategoryManagement from "./pages/Admin/Categories";
import Home from "./pages/Home/Home";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isAdminUser(user) {
  const role = String(user?.role || "").toUpperCase();
  return role === "ADMIN" || role === "ROLE_ADMIN";
}

function AdminRoute({ children }) {
  const user = getCurrentUser();
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function AdminPlaceholder({ title }) {
  return (
    <section className="panel">
      <p className="eyebrow">Admin</p>
      <h3>{title}</h3>
      <p className="topbar-copy">Trang nay dang duoc phat trien.</p>
    </section>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="customers" element={<AdminPlaceholder title="Quan ly khach hang" />} />
            <Route path="staffs" element={<AdminPlaceholder title="Quan ly nhan vien" />} />
            <Route path="reports" element={<AdminPlaceholder title="Bao cao thong ke" />} />
            <Route path="settings" element={<AdminPlaceholder title="Cai dat" />} />
            <Route index element={<Navigate to="services" replace />} />
            <Route path="*" element={<Navigate to="services" replace />} />
          </Route>
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:categoryName" element={<ServiceList />} />
          <Route path="/services/detail/:id" element={<ServiceDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/service" element={<Navigate to="/services" replace />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>

  );
}

export default App;


