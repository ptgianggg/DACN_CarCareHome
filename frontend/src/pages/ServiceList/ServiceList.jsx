import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getServices } from "../../services/api";
import "./style.css";

const LOCAL_IMAGE_MAP_KEY = "service_local_images";
const API_BASE_URL = "http://localhost:8080";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1520340356584-f9d60d106df9?auto=format&fit=crop&q=80&w=400";

function ServiceImage({ service, localImageMap }) {
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

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [rawImage, service.id]);

  return (
    <img
      src={candidates[Math.min(index, candidates.length - 1)]}
      alt={service.name}
      onError={() => {
        setIndex((prev) => (prev < candidates.length - 1 ? prev + 1 : prev));
      }}
    />
  );
}

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localImageMap, setLocalImageMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_IMAGE_MAP_KEY);
      setLocalImageMap(raw ? JSON.parse(raw) : {});
    } catch {
      setLocalImageMap({});
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <div className="loading">Đang tải dịch vụ...</div>;

  return (
    <div className="container">
      <h1 className="page-title">Dịch vụ chăm sóc xe</h1>
      <div className="service-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card-v2">
            <div className="card-top">
              <div className="image-container">
                <ServiceImage service={service} localImageMap={localImageMap} />
              </div>

              <div className="service-info">
                <Link to={`/services/${service.id}`} className="service-name-link">
                  <h3 className="service-name">{service.name}</h3>
                </Link>

                <div className="service-meta">
                  <p className="service-description">{service.description}</p>
                  {service.duration ? (
                    <span className="service-duration">{service.duration} phút</span>
                  ) : null}
                </div>

                <div className="price-wrapper">
                  <span className="current-price">{Number(service.price || 0).toLocaleString()} d</span>
                  <span className={`service-status ${service.active ? "active" : "inactive"}`}>
                    {service.active ? "Hoạt động" : "Tạm dừng"}
                  </span>
                </div>
              </div>
            </div>

            <div className="card-bottom">
              <div className="card-actions">
                <button className="btn-outline btn-detail" onClick={() => navigate(`/services/${service.id}`)}>
                  Chi tiết
                </button>
                <button
                  className="btn-solid btn-book"
                  onClick={() =>
                    navigate(
                      `/booking?service_id=${service.id}&service_price=${encodeURIComponent(
                        service.price ?? 0
                      )}&service_name=${encodeURIComponent(service.name || "")}`
                    )
                  }
                >
                  Đặt lịch
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
