import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './style.css';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service_id');
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="booking-card">
        <h1>Book Your Appointment</h1>
        <p>You have selected service ID: <strong>{serviceId}</strong></p>
        <div className="booking-form-placeholder">
          <p>Booking form will be implemented here.</p>
          <div className="form-group">
             <label>Preferred Date</label>
             <input type="date" />
          </div>
          <button className="btn btn-primary" onClick={() => alert("Booking functionality coming soon!")}>
            Confirm Selection
          </button>
        </div>
        <button onClick={() => navigate('/service')} className="btn-text">Choose Another Service</button>
      </div>
    </div>
  );
};

export default Booking;
