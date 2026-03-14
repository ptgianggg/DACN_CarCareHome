import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">CC</div>
          <div className="brand-copy">
            <p className="eyebrow">Dashboard</p>
            <h1>Admin Center</h1>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className={`nav-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`} href="/admin/dashboard">
            Tổng quan
          </a>
          <a className={`nav-item ${location.pathname === "/admin/bookings" ? "active" : ""}`} href="/admin/bookings">
            Quản lý lịch hẹn
          </a>
          <a className={`nav-item ${location.pathname === "/admin/customers" ? "active" : ""}`} href="/admin/customers">
            Quản lý khách hàng
          </a>
          <a className={`nav-item ${location.pathname === "/admin/staffs" ? "active" : ""}`} href="/admin/staffs">
            Quản lý nhân viên
          </a>
          <a className={`nav-item ${location.pathname === "/admin/categories" ? "active" : ""}`} href="/admin/categories">
            Quản lý danh mục
          </a>
          <a className={`nav-item ${location.pathname === "/admin/services" ? "active" : ""}`} href="/admin/services">
            Quản lý dịch vụ
          </a>
          <a className={`nav-item ${location.pathname === "/admin/reports" ? "active" : ""}`} href="/admin/reports">
            Báo cáo thống kê
          </a>
          <a className={`nav-item ${location.pathname === "/admin/settings" ? "active" : ""}`} href="/admin/settings">
            Cài đặt
          </a>
          <button type="button" className="nav-item admin-exit-btn" onClick={handleLogout}>
            Thoát
          </button>
          <div className="nav-item notice-item">
            <div className="notice-head">
              <p className="eyebrow">Thông báo nhanh</p>
              <span className="notice-level">Ưu tiên</span>
            </div>
            <h2>Ca sáng đang kín 78%</h2>
            <div className="notice-progress">
              <span style={{ width: "78%" }} />
            </div>
            <p>Cần điều phối thêm 1 kỹ thuật viên cho chi nhánh Quận 7 trước 11:00.</p>
            <div className="notice-meta">
              <span>Chi nhánh Quận 7</span>
              <span>Hạn xử lý 11:00</span>
            </div>
          </div>
        </nav>
      </aside>

      <main className="dashboard">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
