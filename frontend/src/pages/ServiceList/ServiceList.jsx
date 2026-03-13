import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getServices } from '../../services/api';
import './style.css';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to resolve dynamic assets from src/assets/images
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "https://images.unsplash.com/photo-1520340356584-f9d60d106df9?auto=format&fit=crop&q=80&w=400";
      
    // If it's a full URL, return it
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // Extract filename if path is provided (e.g., /images/filename.png -> filename.png)
    const filename = imageUrl.split('/').pop();
    
    try {
      return new URL(`../../assets/images/${filename}`, import.meta.url).href;
    } catch (e) {
      console.error("Image not found:", filename);
      return "https://images.unsplash.com/photo-1520340356584-f9d60d106df9?auto=format&fit=crop&q=80&w=400";
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
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
        {services.map(service => (
          <div key={service.id} className="service-card-v2">
            <div className="card-top">
              <div className="image-container">
                <img 
                  src={getImageUrl(service.imageUrl)} 
                  alt={service.name} 
                />
                {service.discountPercentage > 0 && (
                  <span className="discount-badge">-{service.discountPercentage}%</span>
                )}
              </div>
              
              <div className="service-info">
                <Link to={`/services/${service.id}`} className="service-name-link">
                  <h3 className="service-name">{service.name}</h3>
                </Link>
                <div className="service-meta">
                  <p className="service-description">{service.description}</p>
                  {service.duration && (
                    <span className="service-duration">
                      <span className="icon-clock">🕒</span> {service.duration} phút
                    </span>
                  )}
                </div>
                
                <div className="price-wrapper">
                  <span className="current-price">
                    {service.price?.toLocaleString()} ₫
                  </span>
                  {service.originalPrice > service.price && (
                    <span className="original-price">
                      {service.originalPrice?.toLocaleString()} ₫
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="card-bottom">
              <div className="card-actions">
                <button 
                  className="btn-outline btn-detail" 
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  Chi tiết <span className="icon">›</span>
                </button>
                <button 
                  className="btn-solid btn-book"
                  onClick={() => navigate(`/booking?service_id=${service.id}`)}
                >
                  <span className="icon-calendar">📅</span> Đặt lịch
                </button>
              </div>

              <div className="store-info">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                  alt="Store Icon" 
                  className="store-avatar"
                />
                <div className="store-text">
                  <h4 className="store-name">{service.storeName || "CarCare Center"}</h4>
                  <p className="store-address">
                    <span className="icon-pin">📍</span> {service.storeAddress || "Liên hệ để biết địa chỉ"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
