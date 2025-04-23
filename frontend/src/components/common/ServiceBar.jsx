import React from 'react';
import { FaLaptop, FaFileAlt, FaQuestionCircle, FaCog } from 'react-icons/fa';
import './ServiceBar.css';

const ServiceBar = () => {
  const services = [
    {
      id: 1,
      icon: <FaLaptop />,
      title: "Laptop Finder",
      description: "Find Your Laptop Easily"
    },
    {
      id: 2,
      icon: <FaFileAlt />,
      title: "Raise a Complain",
      description: "Share your experience"
    },
    {
      id: 3,
      icon: <FaQuestionCircle />,
      title: "Online Support",
      description: "Get Online Support"
    },
    {
      id: 4,
      icon: <FaCog />,
      title: "Servicing Center",
      description: "Repair Your Device"
    }
  ];

  return (
    <div className="service-bar">
      <div className="service-container">
        <div className="service-grid">
          {services.map(service => (
            <div className="service-card" key={service.id}>
              <div className="service-icon">
                {service.icon}
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceBar; 