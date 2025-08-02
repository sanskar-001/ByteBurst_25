import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const y = (window.scrollY * speed);
        element.style.transform = `translateY(${y}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        
        // Reset submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Location",
      details: "Orion Mall, Mohaddipur, Gorakhpur, Uttar Pradesh, India"
    },
    {
      icon: <FaPhone />,
      title: "Phone Number",
      details: "9559902895 , 95599044346"
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      details: "supportteam@e-waste.com"
    }
  ];

  // Handle navigation to home page
  const handleHomeNavigation = () => {
    window.location.href = '/';
  };

  return (
    <div className="contact-page">
      {/* Background Elements */}
      <div className="contact-bg-gradient"></div>
      <div className="animated-bg-shapes">
        <div className="shape shape-1 parallax" data-speed="0.03"></div>
        <div className="shape shape-2 parallax" data-speed="0.02"></div>
        <div className="shape shape-3 parallax" data-speed="0.04"></div>
        <div className="shape shape-4 parallax" data-speed="0.02"></div>
      </div>
      
      {/* Header Section */}
      <motion.header 
        className="contact-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="header-content">
          <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); handleHomeNavigation(); }}>
            <motion.span 
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              &larr; Back to Home
            </motion.span>
          </a>
          <h1>Contact <span className="highlight">Us</span></h1>
          <p>We're here to help with your e-waste recycling needs. Get in touch with our team for more information or assistance.</p>
        </div>
      </motion.header>
      
      <div className="contact-container">
        {/* Contact Information */}
        <motion.section 
          className="contact-info-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2>Get In Touch</h2>
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index} 
                className="contact-info-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)"
                }}
              >
                <div className="info-icon">
                  {info.icon}
                </div>
                <div className="info-content">
                  <h3>{info.title}</h3>
                  <p>{info.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="social-links"
            variants={itemVariants}
          >
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <motion.a 
                href="#" 
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-facebook-f"></i>
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-twitter"></i>
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-instagram"></i>
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-linkedin-in"></i>
              </motion.a>
            </div>
          </motion.div>
        </motion.section>
        
        {/* Contact Form */}
        <motion.section 
          className="contact-form-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="form-container">
            <h2>Send Us a Message</h2>
            
            {isSubmitted ? (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaCheckCircle />
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <motion.div 
                    className={`form-input ${formErrors.name ? 'error' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </motion.div>
                  
                  <motion.div 
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </motion.div>
                </div>
                
                <motion.div 
                  className={`form-input ${formErrors.subject ? 'error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                  />
                  {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
                </motion.div>
                
                <motion.div 
                  className={`form-input ${formErrors.message ? 'error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Type your message here..."
                  ></textarea>
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </motion.div>
                
                <motion.button 
                  type="submit" 
                  className="submit-button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(76, 175, 80, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <span>Send Message</span>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.section>
      </div>
      
      {/* Map Section */}
      <motion.section 
        className="map-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481013!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI3JzE3LjkiTiA3MMKwMzMnMzAuMSJX!5e0!3m2!1sen!2sus!4v1623271314839!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="location map"
          ></iframe>
          <div className="map-overlay">
            <motion.div 
              className="map-card"
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            >
              <h3>Visit Our Office</h3>
              <p>
                <FaMapMarkerAlt /> 123 Green Street, Eco City
                <br />Earth 54321
              </p>
              <p>
                <FaPhone /> +1 (555) 123-4567
              </p>
              <p>
                <FaEnvelope /> contact@e-waste-recycling.com
              </p>
              <motion.button 
                className="directions-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://maps.google.com", "_blank")}
              >
                Get Directions
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
     
    
    </div>
  );
};

export default ContactPage; 