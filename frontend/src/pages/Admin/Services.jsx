import { useMemo, useState, useEffect } from "react";
import { getServices, createService, updateService, deleteService } from "../../services/api";
import "./style.css";

const emptyForm = {
  name: "",
  price: "",
  duration: "",
  category: "",
  description: "",
  image: "",
  active: true
};

function formatPrice(value) {
  return `${Number(value).toLocaleString("vi-VN")} đ`;
}

function ServiceManagement() {

  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    try {
      const data = await getServices();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch services error:", err);
    }

    setLoading(false);
  }

  const totalPrice = useMemo(() => {
    return services.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [services]);

  function onChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function onImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm(prev => ({
        ...prev,
        image: reader.result
      }));
    };

    reader.readAsDataURL(file);
  }

  async function onSubmit(e) {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      duration: Number(form.duration) || 0,
      imageUrl: form.image || "",
      active: form.active
    };

    if (
      !payload.name ||
      !payload.category ||
      !payload.description ||
      Number.isNaN(payload.price) ||
      payload.price <= 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin hợp lệ");
      return;
    }

    try {

      console.log("Payload gửi lên:", payload);

      let res;

      if (editingId) {
        res = await updateService(editingId, payload);
      } else {
        res = await createService(payload);
      }

      console.log("Response:", res);

      if (res && !res.error) {
        alert("Lưu dịch vụ thành công");
        fetchData();
        resetForm();
      } else {
        alert(res?.message || "Không thể lưu dịch vụ");
      }

    } catch (err) {
      console.error("Create service error:", err);
      alert("Có lỗi xảy ra khi lưu dịch vụ");
    }
  }

  function onEdit(service) {

    setEditingId(service.id);

    setForm({
      name: service.name || "",
      price: String(service.price || ""),
      duration: String(service.duration || ""),
      category: service.category || "",
      description: service.description || "",
      image: service.imageUrl || "",
      active: service.active ?? true
    });
  }

  async function onDelete(id) {

    if (!window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) return;

    try {

      const ok = await deleteService(id);

      if (!ok) {
        alert("Xóa thất bại");
        return;
      }

      fetchData();

      if (editingId === id) {
        resetForm();
      }

    } catch (err) {
      console.error("Delete service error:", err);
      alert("Không thể xóa dịch vụ");
    }
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Dịch vụ</p>
          <h2>Quản lý danh mục dịch vụ</h2>
        </div>
      </header>

      <section className="service-layout">

        {/* FORM */}

        <article className="panel service-form-panel">

          <div className="panel-heading">
            <h3>{editingId ? "Sửa dịch vụ" : "Thêm dịch vụ"}</h3>
          </div>

          <form className="service-form" onSubmit={onSubmit}>

            <input
              name="name"
              placeholder="Tên dịch vụ"
              value={form.name}
              onChange={onChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Giá"
              value={form.price}
              onChange={onChange}
              required
            />

            <input
              name="duration"
              type="number"
              placeholder="Thời gian"
              value={form.duration}
              onChange={onChange}
            />

            <input
              name="category"
              placeholder="Nhóm dịch vụ"
              value={form.category}
              onChange={onChange}
              required
            />

            <input
              name="description"
              placeholder="Mô tả"
              value={form.description}
              onChange={onChange}
              required
            />

            <label>
              Hoạt động
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm(prev => ({
                    ...prev,
                    active: e.target.checked
                  }))
                }
              />
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
            />

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                style={{ width: 120 }}
              />
            )}

            <button type="submit">
              {editingId ? "Cập nhật" : "Thêm dịch vụ"}
            </button>

            <button type="button" onClick={resetForm}>
              Làm mới
            </button>

          </form>
        </article>


        {/* TABLE */}

        <article className="panel service-table-panel">

          <h3>Dịch vụ ({services.length})</h3>

          {loading ? (
            <p>Đang tải...</p>
          ) : (
            services.map(service => (
              <div key={service.id} className="service-table-row">

                <span>{service.name}</span>

                <span>{service.category}</span>

                <span>{formatPrice(service.price)}</span>

                <span>{service.duration} phút</span>

                <button onClick={() => onEdit(service)}>
                  Sửa
                </button>

                <button onClick={() => onDelete(service.id)}>
                  Xóa
                </button>

              </div>
            ))
          )}

        </article>

      </section>
    </>
  );
}

export default ServiceManagement;