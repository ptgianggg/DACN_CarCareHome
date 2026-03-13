import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getServices } from "../../services/api";
import "./Home.css";

const fallbackFeaturedServices = [
  {
    title: "Bảo dưỡng tổng quát",
    desc: "Kiểm tra 18 hạng mục, thay dầu, lọc gió và cân chỉnh cơ bản.",
    meta: "90 - 120 phút",
  },
  {
    title: "Chăm sóc nội thất",
    desc: "Vệ sinh ghế, trần, tapi cửa và khử mùi nội thất chuyên sâu.",
    meta: "120 phút",
  },
  {
    title: "Phủ ceramic",
    desc: "Tăng độ bóng, hạn chế bám nước và bảo vệ sơn xe bền hơn.",
    meta: "180 - 240 phút",
  },
];

const steps = [
  "Đặt lịch online trong 1 phút",
  "Nhận xe, kiểm tra nhanh và xác nhận hạng mục",
  "Cập nhật tiến độ theo thời gian thực",
  "Bàn giao xe sạch, an tâm và có bảo hành",
];

function Home() {
  const navigate = useNavigate();
  const [authVersion, setAuthVersion] = useState(0);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [services, setServices] = useState([]);

  const currentUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [authVersion]);

  const displayName =
    currentUser?.name?.trim() || currentUser?.email?.trim() || "bạn";
  const role = String(currentUser?.role || "").toUpperCase();
  const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const data = await getServices();
        if (!isMounted) return;
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Load services on home failed:", error);
        if (isMounted) setServices([]);
      }
    }

    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeServices = useMemo(
    () => services.filter((service) => service && service.active !== false),
    [services]
  );

  const featuredServices = useMemo(() => {
    if (!activeServices.length) return fallbackFeaturedServices;

    return activeServices.slice(0, 3).map((service) => ({
      id: service.id,
      title: service.name || "Dịch vụ chăm xe",
      desc: service.description || "Chi tiết dịch vụ đang được cập nhật.",
      meta: service.duration ? `${service.duration} phút` : "Liên hệ để được tư vấn",
    }));
  }, [activeServices]);

  const dropdownServices = useMemo(
    () => activeServices.slice(0, 8),
    [activeServices]
  );

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthVersion((prev) => prev + 1);
    navigate("/home");
  }

  return (
    <main className="home-page">
      <div className="home-glow home-glow-1" />
      <div className="home-glow home-glow-2" />

      <header className="home-nav">
        <div className="home-brand">
          <span className="home-brand-mark">CC</span>
          <span>CarCareHome</span>
        </div>
        <nav className="home-menu">
          <Link to="/home">Trang chủ</Link>
          <div
            className={`home-menu-dropdown ${isServiceMenuOpen ? "open" : ""}`}
            onMouseEnter={() => setIsServiceMenuOpen(true)}
            onMouseLeave={() => setIsServiceMenuOpen(false)}
          >
            <button
              type="button"
              className="home-menu-trigger"
              aria-haspopup="true"
              aria-expanded={isServiceMenuOpen}
              onClick={() => setIsServiceMenuOpen((prev) => !prev)}
            >
              Dịch vụ
            </button>
            <div className="home-dropdown-panel">
              <Link to="/services" onClick={() => setIsServiceMenuOpen(false)}>
                Tất cả dịch vụ
              </Link>
              {dropdownServices.length
                ? dropdownServices.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      onClick={() => setIsServiceMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))
                : fallbackFeaturedServices.map((service) => (
                    <Link key={service.title} to="/services" onClick={() => setIsServiceMenuOpen(false)}>
                      {service.title}
                    </Link>
                  ))}
            </div>
          </div>
          <a href="#products">Sản phẩm</a>
          <a href="#contact">Liên hệ</a>
        </nav>
        <div className="home-nav-actions">
          {currentUser ? (
            <>
              <span className="home-user-pill">Xin chào, {displayName}</span>
              {isAdmin ? (
                <button
                  type="button"
                  className="home-secondary-btn"
                  onClick={() => navigate("/admin")}
                >
                  Quản trị
                </button>
              ) : null}
              <button type="button" className="home-link-btn" onClick={onLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="home-link-btn">
                Đăng nhập
              </Link>
              <Link to="/register" className="home-primary-btn">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="home-hero">
        <p className="home-eyebrow">Premium Auto Care</p>
        <h1>Chăm xe đẳng cấp, nhanh gọn, minh bạch chi phí.</h1>
        <p className="home-lead">
          CarCareHome giúp bạn đặt lịch, theo dõi tiến độ và quản lý lịch sử dịch vụ
          trên một giao diện đơn giản.
        </p>
        <div className="home-cta-row">
          <Link to="/register" className="home-primary-btn">
            Bắt đầu miễn phí
          </Link>
          <Link to="/services" className="home-secondary-btn">
            Quản lý dịch vụ
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <p className="home-eyebrow">Dịch vụ nổi bật</p>
          <h2>Lựa chọn phù hợp cho mọi tình trạng xe</h2>
        </div>
        <div className="home-service-grid">
          {featuredServices.map((service) => (
            <article key={service.title} className="home-service-card">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span>{service.meta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-section-alt">
        <div className="home-section-head">
          <p className="home-eyebrow">Quy trình</p>
          <h2>4 bước để xe bạn luôn trong trạng thái tốt nhất</h2>
        </div>
        <ol className="home-step-list">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section id="products" className="home-section">
        <div className="home-section-head">
          <p className="home-eyebrow">Sản phẩm</p>
          <h2>Phụ kiện và dung dịch chăm xe chính hãng</h2>
        </div>
        <p className="home-lead">
          Cung cấp dung dịch rửa xe, phủ bảo vệ, khử mùi và phụ kiện nội thất phù hợp
          từng dòng xe.
        </p>
      </section>

      <section id="contact" className="home-section home-section-alt">
        <div className="home-section-head">
          <p className="home-eyebrow">Liên hệ</p>
          <h2>Đặt lịch nhanh qua hotline và fanpage</h2>
        </div>
        <p className="home-lead">
          Hotline: 0900 123 456 - Email: support@carcarehome.vn - Địa chỉ: Quận 7,
          TP.HCM.
        </p>
      </section>
    </main>
  );
}

export default Home;
