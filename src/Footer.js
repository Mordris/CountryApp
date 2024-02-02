// Footer.js
import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-app">CountryApp</div>
        <div className="footer-creator">
          Created by <span>Yunus Emre Gültepe</span>
        </div>
      </div>
      <div className="footer">
        <p>Copyright © {currentYear}</p>
      </div>
    </div>
  );
}

export default Footer;
