import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createBooking, getServiceById } from "../../services/api";
import "./style.css";

const initialForm = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  vehicleType: "",
  vehiclePlate: "",
  serviceType: "",
  bookingDate: "",
  bookingTime: "",
  addressName: "",
  note: "",
  status: "PENDING",
  totalPrice: "",
  depositAmount: "",
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service_id");
  const servicePriceParam = searchParams.get("service_price");
  const serviceNameParam = searchParams.get("service_name");
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loadingService, setLoadingService] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const initialPrice =
      servicePriceParam !== null && !Number.isNaN(Number(servicePriceParam))
        ? String(Number(servicePriceParam))
        : "";

    setForm((prev) => ({
      ...prev,
      serviceType: serviceNameParam || prev.serviceType,
      totalPrice: initialPrice || prev.totalPrice,
    }));

    const loadService = async () => {
      if (!serviceId) return;
      setLoadingService(true);
      try {
        const service = await getServiceById(serviceId);
        if (service) {
          setForm((prev) => ({
            ...prev,
            serviceType: service.name || prev.serviceType,
            totalPrice: service.price != null ? String(service.price) : prev.totalPrice,
          }));
        }
      } catch (error) {
        console.error("Load service for booking failed:", error);
      } finally {
        setLoadingService(false);
      }
    };

    loadService();
  }, [serviceId, serviceNameParam, servicePriceParam]);

  const canSubmit = useMemo(() => {
    return (
      form.customerName.trim() &&
      form.customerPhone.trim() &&
      form.vehicleType.trim() &&
      form.vehiclePlate.trim() &&
      form.serviceType.trim() &&
      form.bookingDate &&
      form.bookingTime &&
      form.addressName.trim() &&
      form.totalPrice !== "" &&
      Number(form.totalPrice) >= 0 &&
      form.depositAmount !== "" &&
      Number(form.depositAmount) >= 0 &&
      Number(form.depositAmount) <= Number(form.totalPrice) * 0.5
    );
  }, [form]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      alert("Vui lòng nh?p d?y d? thông tin b?t bu?c. Ti?n c?c t?i da 50% t?ng ti?n.");
      return;
    }

    const payload = {
      customerName: form.customerName.trim(),
      customerPhone: form.customerPhone.trim(),
      customerEmail: form.customerEmail.trim() || null,
      vehicleType: form.vehicleType.trim(),
      vehiclePlate: form.vehiclePlate.trim(),
      serviceType: form.serviceType.trim(),
      bookingDate: form.bookingDate,
      bookingTime: form.bookingTime,
      addressName: form.addressName.trim(),
      note: form.note.trim() || null,
      status: form.status || "PENDING",
      totalPrice: Number(form.totalPrice),
      depositAmount: Number(form.depositAmount),
    };

    setSaving(true);
    try {
      const result = await createBooking(payload);
      if (result?.error) {
        alert(result.message || "Không th? t?o l?ch h?n");
        return;
      }
      alert("Ð?t l?ch thành công");
      navigate("/services");
    } catch (error) {
      console.error("Create booking failed:", error);
      alert("Có l?i x?y ra khi t?o l?ch h?n");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <div className="booking-card">
        <h1>Ð?t l?ch d?ch v?</h1>
        {serviceId ? (
          <p>
            Ðang d?t l?ch cho d?ch v? ID: <strong>{serviceId}</strong>
          </p>
        ) : null}

        <form className="booking-form-placeholder" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Tên khách hàng *</label>
            <input name="customerName" value={form.customerName} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>S? di?n tho?i *</label>
            <input name="customerPhone" value={form.customerPhone} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="customerEmail" type="email" value={form.customerEmail} onChange={onChange} />
          </div>

          <div className="form-group">
            <label>Lo?i xe *</label>
            <input name="vehicleType" value={form.vehicleType} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Bi?n s? xe *</label>
            <input name="vehiclePlate" value={form.vehiclePlate} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Lo?i d?ch v? *</label>
            <input name="serviceType" value={form.serviceType} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Ngày h?n *</label>
            <input name="bookingDate" type="date" value={form.bookingDate} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Gi? h?n *</label>
            <input name="bookingTime" type="time" value={form.bookingTime} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Ð?a ch? *</label>
            <input name="addressName" value={form.addressName} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Ghi chú</label>
            <input name="note" value={form.note} onChange={onChange} />
          </div>

          <div className="form-group">
            <label>T?ng ti?n *</label>
            <input
              name="totalPrice"
              type="number"
              min="0"
              step="1000"
              value={form.totalPrice}
              readOnly
              required
            />
          </div>

          <div className="form-group">
            <label>Ti?n c?c * (t?i da 50% t?ng ti?n)</label>
            <input
              name="depositAmount"
              type="number"
              min="0"
              step="1000"
              max={form.totalPrice ? Math.floor(Number(form.totalPrice) * 0.5) : undefined}
              value={form.depositAmount}
              onChange={onChange}
              required
            />
            {form.depositAmount !== "" &&
            form.totalPrice !== "" &&
            Number(form.depositAmount) > Number(form.totalPrice) * 0.5 ? (
              <small style={{ color: "#b91c1c" }}>
                Ti?n c?c không du?c vu?t quá 50% t?ng ti?n d?ch v?.
              </small>
            ) : null}
          </div>

          <button
            className="btn btn-primary booking-submit"
            type="submit"
            disabled={saving || loadingService || !canSubmit}
          >
            {saving ? "Ðang g?i..." : "Xác nh?n d?t l?ch"}
          </button>
        </form>

        <button onClick={() => navigate("/services")} className="btn-text">
          Ch?n d?ch v? khác
        </button>
      </div>
    </div>
  );
};

export default Booking;
