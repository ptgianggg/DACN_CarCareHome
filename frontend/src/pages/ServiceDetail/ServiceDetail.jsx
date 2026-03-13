import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "../../services/api";
import "./style.css";

const LOCAL_IMAGE_MAP_KEY = "service_local_images";
const API_BASE_URL = "http://localhost:8080";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1520340356584-f9d60d106df9?auto=format&fit=crop&q=80&w=800";

function ServiceDetailImageWithFallback({ candidates, alt }) {
  const [index, setIndex] = useState(0);

  return (
    <img
      src={candidates[Math.min(index, candidates.length - 1)]}
      alt={alt}
      className="main-service-img"
      onError={() => {
        setIndex((prev) => (prev < candidates.length - 1 ? prev + 1 : prev));
      }}
    />
  );
}

function ServiceDetailImage({ service, localImageMap }) {
  const rawImage = (localImageMap[String(service.id)] || service.imageUrl || "").trim();

  const candidates = [];
  if (rawImage) {
    if (rawImage.startsWith("data:") || rawImage.startsWith("http")) {
      candidates.push(rawImage);
    } else if (rawImage.startsWith("/")) {
      candidates.push(`${API_BASE_URL}${rawImage}`);
      candidates.push(`${API_BASE_URL}/uploads${rawImage}`);
    } else {
      candidates.push(`${API_BASE_URL}/${rawImage}`);
      candidates.push(`${API_BASE_URL}/uploads/${rawImage}`);
      candidates.push(`${API_BASE_URL}/images/${rawImage}`);
      candidates.push(new URL(`../../assets/images/${rawImage}`, import.meta.url).href);
    }
  }
  candidates.push(FALLBACK_IMAGE);

  const imageKey = `${service.id}-${rawImage || "fallback"}`;
  return <ServiceDetailImageWithFallback key={imageKey} candidates={candidates} alt={service.name} />;
}

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localImageMap, setLocalImageMap] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_IMAGE_MAP_KEY);
      setLocalImageMap(raw ? JSON.parse(raw) : {});
    } catch {
      setLocalImageMap({});
    }
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(id);
        setService(data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="loading">Đang tải chi tiết...</div>;
  if (!service) return <div className="error">Không tìm thấy dịch vụ!</div>;

  const price = Number(service.price || 0).toLocaleString();
  const durationText = service.duration ? `${service.duration} phút` : "Liên hệ để tư vấn";
  const storeName = service.storeName || "CarCare Center";
  const storeAddress = service.storeAddress || "Liên hệ để biết thêm chi tiết";

  return (
    <div className="service-detail-page">
      <div className="service-detail-card">
        <button onClick={() => navigate("/services")} className="btn-back">
          ← Quay lại danh sách
        </button>

        <div className="service-detail-layout">
          <div className="detail-image-box">
            <ServiceDetailImage service={service} localImageMap={localImageMap} />
          </div>

          <div className="detail-main-info">
            <h1 className="detail-title">{service.name}</h1>
            <div className="detail-meta-row">
              <span className="detail-chip">{storeName}</span>
              <span className="detail-chip">{durationText}</span>
            </div>
            <div className="price-section">
              <span className="detail-current-price">{price} đ</span>
            </div>
            <p className="detail-short-desc">{service.description || "Dịch vụ đang được cập nhật nội dung."}</p>
            <div className="detail-actions">
              <button
                onClick={() =>
                  navigate(
                    `/booking?service_id=${service.id}&service_price=${encodeURIComponent(
                      service.price ?? 0
                    )}&service_name=${encodeURIComponent(service.name || "")}`
                  )
                }
                className="btn btn-primary-solid"
              >
                Đặt lịch ngay
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/services")}>
                Xem dịch vụ khác
              </button>
            </div>
          </div>
        </div>

        <div className="detail-description">
          <h3>Mô tả chi tiết</h3>
          <p>{service.description || "Nội dung chi tiết đang được cập nhật."}</p>
          <div className="address-info">
            <strong>Địa điểm:</strong> {storeAddress}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
