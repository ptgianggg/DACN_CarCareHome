import "./style.css";

const stats = [
  { label: "Lich hen hom nay", value: "28", change: "+12% so voi hom qua" },
  { label: "Doanh thu tam tinh", value: "48.5M", change: "+8% tuan nay" },
  { label: "Ky thuat vien dang ranh", value: "06", change: "2 nguoi co the nhan xe ngay" },
  { label: "Danh gia trung binh", value: "4.8/5", change: "128 phan hoi moi" },
];

const bookings = [
  {
    customer: "Nguyen Minh Quan",
    service: "Bao duong tong quat",
    time: "08:30",
    branch: "Chi nhanh Quan 7",
    status: "Cho xac nhan",
  },
  {
    customer: "Tran Hoang Phuc",
    service: "Ve sinh khoang may",
    time: "09:15",
    branch: "Chi nhanh Thu Duc",
    status: "Dang tiep nhan",
  },
  {
    customer: "Le Bao Chau",
    service: "Cham soc noi that premium",
    time: "10:00",
    branch: "Chi nhanh Go Vap",
    status: "Hoan tat",
  },
  {
    customer: "Pham Gia Huy",
    service: "Phu ceramic 5 lop",
    time: "10:45",
    branch: "Chi nhanh Binh Thanh",
    status: "Can goi lai",
  },
];

const technicians = [
  { name: "Ngoc Hai", task: "Dang phu ceramic xe Mazda CX-5", progress: 84 },
  { name: "Hoang Nam", task: "Dang rua khoang may xe Ford Ranger", progress: 61 },
  { name: "Minh Duc", task: "Dang ve sinh noi that xe Kia Carnival", progress: 46 },
];

const alerts = [
  "3 lich hen chua duoc xac nhan trong 15 phut qua.",
  "Kho vat tu sap het dung dich phu bong nhanh.",
  "Chi nhanh Thu Duc co ty le huy lich cao hon muc trung binh.",
];

function statusClass(status) {
  switch (status) {
    case "Hoan tat":
      return "status success";
    case "Dang tiep nhan":
      return "status active";
    case "Can goi lai":
      return "status warning";
    default:
      return "status pending";
  }
}

function Dashboard() {
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
          <a className="nav-item active" href="/dashboard">
            Tổng quan
          </a>
          <a className="nav-item" href="/bookings">
            Quản lý lịch hẹn
          </a>
          <a className="nav-item" href="/customers">
            Quản lý khách hàng
          </a>
          <a className="nav-item" href="/staffs">
            Quản lý nhân viên
          </a>
          <a className="nav-item" href="/services">
            Quản lý dịch vụ
          </a>
          <a className="nav-item" href="/reports">
            Báo cáo thống kê
          </a>
          <a className="nav-item" href="/settings">
            Cài đặt
          </a>
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Thong bao nhanh</p>
          <h2>Ca sang dang kin 78%</h2>
          <p>
            Can dieu phoi them 1 ky thuat vien cho chi nhanh Quan 7 truoc 11:00.
          </p>
          <button type="button">Dieu phoi ngay</button>
        </div>
      </aside>

      <main className="dashboard">
        <header className="topbar" id="overview">
          <div>
            <p className="eyebrow">Bang dieu khien</p>
            <h2>Xin chao, Admin</h2>
            <p className="topbar-copy">
              Theo doi lich hen, doanh thu va tinh trang van hanh cua he thong trong
              mot man hinh.
            </p>
          </div>

          <div className="topbar-actions">
            <input type="text" placeholder="Tim lich hen, khach hang..." />
            <button type="button" className="ghost-button">
              Xuat bao cao
            </button>
            <button type="button" className="primary-button">
              Tao lich hen
            </button>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.change}</span>
            </article>
          ))}
        </section>

        <section className="hero-grid">
          <article className="panel spotlight">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Hieu suat hom nay</p>
                <h3>Luu luong dat lich on dinh</h3>
              </div>
              <span className="pill">Cap nhat luc 10:24</span>
            </div>

            <div className="spotlight-chart" aria-hidden="true">
              <span style={{ height: "42%" }} />
              <span style={{ height: "68%" }} />
              <span style={{ height: "58%" }} />
              <span style={{ height: "82%" }} />
              <span style={{ height: "73%" }} />
              <span style={{ height: "94%" }} />
              <span style={{ height: "76%" }} />
            </div>

            <div className="spotlight-summary">
              <div>
                <small>Ti le chot lich</small>
                <strong>86%</strong>
              </div>
              <div>
                <small>Khach quay lai</small>
                <strong>41%</strong>
              </div>
              <div>
                <small>Don trung binh</small>
                <strong>1.730.000d</strong>
              </div>
            </div>
          </article>

          <article className="panel alerts-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Can xu ly</p>
                <h3>Thong bao van hanh</h3>
              </div>
            </div>
            <div className="alert-list">
              {alerts.map((alert) => (
                <div key={alert} className="alert-item">
                  <span className="alert-dot" />
                  <p>{alert}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel table-panel" id="bookings">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Danh sach</p>
                <h3>Lich hen gan nhat</h3>
              </div>
              <a href="#customers">Xem toan bo</a>
            </div>

            <div className="booking-table">
              <div className="table-head">
                <span>Khach hang</span>
                <span>Dich vu</span>
                <span>Gio</span>
                <span>Chi nhanh</span>
                <span>Trang thai</span>
              </div>

              {bookings.map((booking) => (
                <div key={`${booking.customer}-${booking.time}`} className="table-row">
                  <span>{booking.customer}</span>
                  <span>{booking.service}</span>
                  <span>{booking.time}</span>
                  <span>{booking.branch}</span>
                  <span className={statusClass(booking.status)}>{booking.status}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel side-panel" id="services">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Tien do</p>
                <h3>Ky thuat vien</h3>
              </div>
            </div>

            <div className="tech-list">
              {technicians.map((tech) => (
                <div key={tech.name} className="tech-item">
                  <div className="tech-row">
                    <strong>{tech.name}</strong>
                    <span>{tech.progress}%</span>
                  </div>
                  <p>{tech.task}</p>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${tech.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-actions">
              <button type="button" className="primary-button">
                Tao ca lam moi
              </button>
              <button type="button" className="ghost-button">
                Quan ly bang gia
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
