import { useMemo, useState } from "react";
import "./style.css";

const initialServices = [
  {
    id: 1,
    name: "Bao duong tong quat",
    price: 850000,
    duration: 120,
    category: "Bao duong",
    description: "Kiem tra tong quat, thay dau, loc gio va can chinh co ban.",
    image: "",
  },
  {
    id: 2,
    name: "Phu ceramic 5 lop",
    price: 3200000,
    duration: 240,
    category: "Cham soc ngoai that",
    description: "Bao ve son xe, tang do bong va han che bam nuoc.",
    image: "",
  },
  {
    id: 3,
    name: "Ve sinh noi that premium",
    price: 1200000,
    duration: 150,
    category: "Noi that",
    description: "Lam sach ghe, tran, tapi cua va khu mui noi that chuyen sau.",
    image: "",
  },
];

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
  const [services, setServices] = useState(initialServices);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const totalPrice = useMemo(
    () => services.reduce((sum, item) => sum + item.price, 0),
    [services]
  );

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
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
      setServices((prev) => [...prev, { id: Date.now(), ...payload }]);
    }

    resetForm();
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
  }

  function onDelete(id) {
    setServices((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
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
            Tong quan
          </a>
          <a className="nav-item" href="/bookings">
            Quan ly lich hen
          </a>
          <a className="nav-item" href="/customers">
            Quan ly khach hang
          </a>
          <a className="nav-item" href="/staff">
            Quan ly nhan vien
          </a>
          <a className="nav-item active" href="/services">
            Quan ly dich vu
          </a>
          <a className="nav-item" href="/reports">
            Bao cao thong ke
          </a>
          <a className="nav-item" href="/settings">
            Cai dat
          </a>
        </nav>
      </aside>

      <main className="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dich vu</p>
            <h2>Quan ly danh muc dich vu</h2>
            <p className="topbar-copy">
              Them, sua, xoa dich vu va cap nhat gia nhanh trong mot man hinh.
            </p>
          </div>
        </header>

        <section className="service-layout">
          <article className="panel service-form-panel">
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
                <button type="button" className="ghost-button" onClick={resetForm}>
                  Lam moi
                </button>
              </div>
            </form>
          </article>

          <article className="panel service-table-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Danh sach</p>
                <h3>Dich vu hien co ({services.length})</h3>
              </div>
              <span className="pill">Tong gia: {formatPrice(totalPrice)}</span>
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
                <div key={service.id} className="service-table-row">
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
                  <span className="row-actions">
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
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default ServiceManagement;
