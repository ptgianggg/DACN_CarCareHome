import React from 'react';
import './style.css';
import ServiceList from '../ServiceList/ServiceList';

const Service = () => {
  return (
    <div className="service-page">
      <div className="service-hero">
        <h1>Car Care Professional Services</h1>
        <p>Premium care for your beloved vehicle</p>
      </div>
      <ServiceList />
    </div>
  );
};

export default Service;
