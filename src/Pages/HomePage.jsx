import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Components/HomePageComponents/nav.jsx";
import Hero from "../Components/HomePageComponents/Hero.jsx";
import About from "../Components/HomePageComponents/About.jsx";
import Services from "../Components/HomePageComponents/Service.jsx";
import Contact from "../Components/HomePageComponents/Contact.jsx";
import Footer from "../Components/HomePageComponents/footer.jsx";
import "./HomePage.css";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic',
    });

    // Dynamically load Google Fonts
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(linkElement);

    // Prevent XSS by sanitizing any user input
    const sanitizeInput = (input) => {
      return input.replace(/[&<>"']/g, (match) => {
        const entities = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;'
        };
        return entities[match];
      });
    };

    // Apply sanitization to any user input fields
    const userInputs = document.querySelectorAll('input, textarea');
    userInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        e.target.value = sanitizeInput(e.target.value);
      });
    });

    // Cleanup
    return () => {
      document.head.removeChild(linkElement);
    }
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="homepage-container"
      >
        <div className="background-gradient"></div>
        <div className="animated-bg-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`}></div>
          ))}
        </div>
        
        <Navbar />
        
        <motion.div 
          data-aos="fade-up"
          className="section-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          <Hero />
        </motion.div>

        <motion.div 
          data-aos="fade-up" 
          data-aos-delay="200"
          className="section-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          <About />
        </motion.div>
        
        <motion.div 
          data-aos="fade-up" 
          data-aos-delay="300"
          className="section-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          <Services />
        </motion.div>
        
        <motion.div 
          data-aos="fade-up" 
          data-aos-delay="400"
          className="section-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          
        </motion.div>
        
        <motion.div 
          data-aos="fade-up" 
          data-aos-delay="500"
          className="section-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          <Footer />
        </motion.div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="scroll-text">Scroll Down</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
