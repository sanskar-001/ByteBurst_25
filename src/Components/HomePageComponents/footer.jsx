import React from "react";
import "./Footer.css";
import { motion } from "framer-motion";


const Footer = () => {
  return (
    <footer className="footer">
       {/* FAQ Section */}
       <motion.section 
        className="faq-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <h3>How can I schedule a pickup for my e-waste?</h3>
              <p>You can schedule a pickup through our website by visiting the Schedule Pickup page, or by contacting our customer service team directly.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <h3>What types of electronics do you accept?</h3>
              <p>We accept all kinds of electronic waste including computers, laptops, mobile phones, televisions, appliances, and more.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <h3>Is there a fee for e-waste recycling services?</h3>
              <p>Most of our recycling services are free. For certain items, there may be a small processing fee. Please contact us for specific details.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <h3>How is my data protected when recycling devices?</h3>
              <p>We follow strict data destruction protocols that meet industry standards to ensure all personal and sensitive information is completely removed from devices.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
     
      <div className="contact-footer">
      <div className="footer-content">
          <p>&copy; 2023 E-Waste Recycling. All rights reserved.</p>
          <p>
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); window.location.href = '/privacy-policy'; }}>Privacy Policy</a> | 
            <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); window.location.href = '/terms-of-service'; }}> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
