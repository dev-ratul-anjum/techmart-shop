import React, { useState, useEffect } from 'react';
import './QuestionModal.css';

const QuestionModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.topic) {
      newErrors.topic = 'Please select a topic';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        topic: '',
        message: ''
      });
      
      // Close modal
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="question-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Ask a Question About {productName}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-divider"></div>
        
        <form className="question-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">
              Your Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="form-field">
            <label htmlFor="email">
              Your Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-field">
            <label htmlFor="topic">
              Topic <span className="required">*</span>
            </label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className={errors.topic ? 'error' : ''}
            >
              <option value="">-- Please Select --</option>
              <option value="specifications">Product Specifications</option>
              <option value="compatibility">Compatibility</option>
              <option value="shipping">Shipping & Delivery</option>
              <option value="warranty">Warranty & Support</option>
              <option value="other">Other</option>
            </select>
            {errors.topic && <div className="error-message">{errors.topic}</div>}
          </div>
          
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="4"
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal; 