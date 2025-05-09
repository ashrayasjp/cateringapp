import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // You'll create this for styles

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <br/>
          <a>ahaarfood@gmail.com</a>
         
        </div>

        <div className="footer-section">
        <h2>
          <ul>
            
            <li><div className="foot"><Link to="/faq">FAQ</Link></div></li>
            <br/>
            <li><div className="foot"><Link to="/about">About Us</Link></div></li>
           
          </ul>
          </h2>
        </div>

        <div className="footer-section">
        <div className="social-icons">
          <h3>Follow Us</h3>
          
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
