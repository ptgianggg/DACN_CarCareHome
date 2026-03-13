import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../../services/api';
import './style.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to resolve dynamic assets from src/assets/images
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "https://images.unsplash.com/photo-1520340356584-f9d60d106df9?auto=format&fit=crop&q=80&w=800";
    if (imageUrl.startsWith('http')) return imageUrl;
    const filename = imageUrl.split('/').pop();
    try {
      return new URL(`../../assets/images/${filename}`, import.meta.url).href;
    } catch (e) {
      return "https://images.unsplash.com/photo-1520340356584-f9d60d106df9?auto=format&fit=crop&q=80&w=800";
    }
  };

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

  return (
    <div className="container">
      <div className="service-detail-card">
        <button onClick={() => navigate('/service')} className="btn-back">← Quay lại danh sách</button>
        
        <div className="detail-header-v2">
          <div className="detail-image-box">
             <img src={getImageUrl(service.imageUrl)} alt={service.name} className="main-service-img" />
             {service.discountPercentage > 0 && (
               <span className="discount-badge-large">-{service.discountPercentage}% OFF</span>
             )}
          </div>
          
          <div className="detail-main-info">
            <h1 className="detail-title">{service.name}</h1>
            
            <div className="price-section">
              <span className="detail-current-price">{service.price?.toLocaleString()} ₫</span>
              {service.originalPrice > service.price && (
                <span className="detail-original-price">{service.originalPrice?.toLocaleString()} ₫</span>
              )}
            </div>

            <div className="store-badge">
              <span className="icon-store">🏪</span> {service.storeName || "CarCare Center"}
            </div>

            {service.duration && (
              <div className="duration-badge">
                <span className="icon-clock">🕒</span> Thời gian thực hiện: <strong>{service.duration}</strong>
              </div>
            )}

            <div className="detail-actions">
              <button 
                onClick={() => navigate(`/booking?service_id=${service.id}`)} 
                className="btn btn-primary-solid"
              >
                Đặt lịch ngay
              </button>
            </div>
          </div>
        </div>

        <div className="detail-description">
          <h3>Thông tin dịch vụ</h3>
          <p>{service.description}</p>
          <div className="address-info">
             <strong>📍 Địa điểm:</strong> {service.storeAddress || "Liên hệ để biết thêm chi tiết"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
