import { useEffect, useState } from "react";
import "./style.css";

const initialServices = [];
const SERVICES_STORAGE_KEY = "carcare_services";

const emptyForm = {
  name: "",
  price: "",
  duration: "",
  category: "",
  description: "",
  image: "",
};

function formatPrice(value) {
  return `${Number(value).toLocaleString("vi-VN")} d`;
}

function ServiceManagement() {
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(SERVICES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [detailService, setDetailService] = useState(null);

  useEffect(() => {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function closeForm() {
    resetForm();
    setIsFormOpen(false);
  }

  function onImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function onSubmit(event) {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      duration: Number(form.duration),
      image: form.image || "",
    };

    if (
      !payload.name ||
      !payload.category ||
      !payload.description ||
      Number.isNaN(payload.price) ||
      Number.isNaN(payload.duration) ||
      payload.price <= 0 ||
      payload.duration <= 0
    ) {
      return;
    }

    if (editingId) {
      setServices((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...payload } : item))
      );
    } else {
      const newService = { id: Date.now(), ...payload };
      setServices((prev) => [...prev, newService]);
    }

    closeForm();
  }

  function onEdit(service) {
    setEditingId(service.id);
    setForm({
      name: service.name,
      price: String(service.price),
      duration: String(service.duration),
      category: service.category,
      description: service.description,
      image: service.image || "",
    });
    setIsFormOpen(true);
  }

  function onDelete(id) {
    setServices((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      closeForm();
    }
  }

  function onAddClick() {
    resetForm();
    setIsFormOpen(true);
  }

  function closeDetailModal() {
    setDetailService(null);
  }

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
          <a className="nav-item" href="/dashboard">
            Tổng quan
          </a>
          <a className="nav-item" href="/bookings">
            Quản lý lịch hẹn
          </a>
          <a className="nav-item" href="/customers">
            Quản lý khách hàng
          </a>
          <a className="nav-item" href="/staff">
            Quản lý nhân viên
          </a>
          <a className="nav-item active" href="/services">
            Quản lý dịch vụ
          </a>
          <a className="nav-item" href="/reports">
            Báo cáo thống kê
          </a>
          <a className="nav-item" href="/settings">
            Cài đặt
          </a>
        </nav>
      </aside>

      <main className="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dich vu</p>
            <h2>Quan ly danh muc dich vu</h2>
            <p className="topbar-copy">
            </p>
          </div>
        </header>

        <section className="service-layout">
          <article className="panel service-table-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Danh sach</p>
                <h3>Dich vu hien co ({services.length})</h3>
              </div>
              <button type="button" className="primary-button" onClick={onAddClick}>
                Them
              </button>
            </div>

            <div className="service-table">
              <div className="service-table-head">
                <span>Ten</span>
                <span>Nhom</span>
                <span>Mo ta</span>
                <span>Anh</span>
                <span>Gia</span>
                <span>Thoi gian</span>
                <span>Tac vu</span>
              </div>

              {services.map((service) => (
                <div
                  key={service.id}
                  className="service-table-row"
                  onDoubleClick={() => setDetailService(service)}
                >
                  <span>{service.name}</span>
                  <span>{service.category}</span>
                  <span className="service-description">{service.description}</span>
                  <span>
                    {service.image ? (
                      <img
                        className="service-thumb"
                        src={service.image}
                        alt={service.name}
                      />
                    ) : (
                      <span className="no-image">Chua co anh</span>
                    )}
                  </span>
                  <span>{formatPrice(service.price)}</span>
                  <span>{service.duration} phut</span>
                  <span
                    className="row-actions"
                    onDoubleClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="ghost-button action-button"
                      onClick={() => onEdit(service)}
                    >
                      Sua
                    </button>
                    <button
                      type="button"
                      className="danger-button action-button"
                      onClick={() => onDelete(service.id)}
                    >
                      Xoa
                    </button>
                  </span>
                </div>
              ))}
              {!services.length ? (
                <div className="empty-state">
                  <p>Chua co dich vu. Bam Them de tao moi.</p>
                </div>
              ) : null}
            </div>
          </article>
        </section>

        {isFormOpen ? (
          <div className="service-modal-backdrop" onClick={closeForm}>
            <article className="panel service-modal" onClick={(event) => event.stopPropagation()}>
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">{editingId ? "Cap nhat" : "Tao moi"}</p>
                  <h3>{editingId ? "Sua dich vu" : "Them dich vu"}</h3>
                </div>
              </div>

              <form className="service-form" onSubmit={onSubmit}>
                <label>
                  Ten dich vu
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Nhap ten dich vu"
                    required
                  />
                </label>
                <label>
                  Gia (VND)
                  <input
                    name="price"
                    type="number"
                    min="1000"
                    step="1000"
                    value={form.price}
                    onChange={onChange}
                    placeholder="Vi du: 1500000"
                    required
                  />
                </label>
                <label>
                  Thoi gian (phut)
                  <input
                    name="duration"
                    type="number"
                    min="10"
                    step="5"
                    value={form.duration}
                    onChange={onChange}
                    placeholder="Vi du: 120"
                    required
                  />
                </label>
                <label>
                  Nhom dich vu
                  <input
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    placeholder="Bao duong / Noi that..."
                    required
                  />
                </label>
                <label>
                  Mo ta
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    placeholder="Mo ta chi tiet ve dich vu..."
                    rows={3}
                    required
                  />
                </label>
                <label>
                  Upload anh
                  <input type="file" accept="image/*" onChange={onImageChange} />
                </label>
                {form.image ? (
                  <div className="service-image-preview">
                    <img src={form.image} alt="Service preview" />
                  </div>
                ) : null}

                <div className="service-form-actions">
                  <button type="submit" className="primary-button">
                    {editingId ? "Luu thay doi" : "Them dich vu"}
                  </button>
                  <button type="button" className="ghost-button" onClick={closeForm}>
                    Dong
                  </button>
                </div>
              </form>
            </article>
          </div>
        ) : null}

        {detailService ? (
          <div className="service-modal-backdrop" onClick={closeDetailModal}>
            <article className="panel service-modal" onClick={(event) => event.stopPropagation()}>
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Chi tiet</p>
                  <h3>{detailService.name}</h3>
                </div>
              </div>

              <div className="service-detail">
                <div className="service-detail-image">
                  {detailService.image ? (
                    <img src={detailService.image} alt={detailService.name} />
                  ) : (
                    <span className="no-image">Chua co anh</span>
                  )}
                </div>
                <div className="service-detail-grid">
                  <p>
                    <strong>Nhom:</strong> {detailService.category}
                  </p>
                  <p>
                    <strong>Gia:</strong> {formatPrice(detailService.price)}
                  </p>
                  <p>
                    <strong>Thoi gian:</strong> {detailService.duration} phut
                  </p>
                  <p className="service-detail-description">
                    <strong>Mo ta:</strong> {detailService.description}
                  </p>
                </div>
              </div>

              <div className="service-form-actions">
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => {
                    closeDetailModal();
                    onEdit(detailService);
                  }}
                >
                  Sua
                </button>
                <button type="button" className="ghost-button" onClick={closeDetailModal}>
                  Dong
                </button>
              </div>
            </article>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default ServiceManagement;
