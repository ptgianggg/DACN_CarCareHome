import { Link } from "react-router-dom";
import "./Home.css";

const featuredServices = [
  {
    title: "Bao duong tong quat",
    desc: "Kiem tra 18 hang muc, thay dau, loc gio va can chinh co ban.",
    meta: "90 - 120 phut",
  },
  {
    title: "Cham soc noi that",
    desc: "Ve sinh ghe, tran, tapi cua va khu mui noi that chuyen sau.",
    meta: "120 phut",
  },
  {
    title: "Phu ceramic",
    desc: "Tang do bong, han che bam nuoc va bao ve son xe ben hon.",
    meta: "180 - 240 phut",
  },
];

const steps = [
  "Dat lich online trong 1 phut",
  "Nhan xe, kiem tra nhanh va xac nhan hang muc",
  "Cap nhat tien do theo thoi gian thuc",
  "Ban giao xe sach, an tam va co bao hanh",
];

function Home() {
  return (
    <main className="home-page">
      <div className="home-glow home-glow-1" />
      <div className="home-glow home-glow-2" />

      <header className="home-nav">
        <div className="home-brand">
          <span className="home-brand-mark">CC</span>
          <span>CarCareHome</span>
        </div>
        <div className="home-nav-actions">
          <Link to="/login" className="home-link-btn">
            Dang nhap
          </Link>
          <Link to="/register" className="home-primary-btn">
            Dat lich ngay
          </Link>
        </div>
      </header>

      <section className="home-hero">
        <p className="home-eyebrow">Premium Auto Care</p>
        <h1>Cham xe dang cap, nhanh gon, minh bach chi phi.</h1>
        <p className="home-lead">
          CarCareHome giup ban dat lich, theo doi tien do va quan ly lich su dich vu
          tren mot giao dien don gian.
        </p>
        <div className="home-cta-row">
          <Link to="/register" className="home-primary-btn">
            Bat dau mien phi
          </Link>
          <Link to="/services" className="home-secondary-btn">
            Quan ly dich vu
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <p className="home-eyebrow">Dich vu noi bat</p>
          <h2>Lua chon phu hop cho moi tinh trang xe</h2>
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
          <p className="home-eyebrow">Quy trinh</p>
          <h2>4 buoc de xe ban luon trong trang thai tot nhat</h2>
        </div>
        <ol className="home-step-list">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default Home;
