// MenuOverlay.js
import React, { useState } from 'react';
import './MenuOverlay.css';
import GuidePopup from './GuidePopup';
import VerificationPopup from './VerificationPopup';

function MenuOverlay({ isOpen, onClose }) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  
  const handleGuideClick = () => {
    setIsGuideOpen(true);
  };
  
  const handleVerificationClick = () => {
    setIsVerificationOpen(true);
  };
  
  return (
    <>
      {/* Background overlay with blur */}
      <div 
        className={`menu-overlay-bg ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      ></div>
      
      {/* Slide-in panel */}
      <div className={`menu-panel ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          {/* Logo + Title */}
          <div className="menu-logo">
            <img src="/assets/eruvify-logo.png" alt="Eruvify" />
          </div>
          {/* Close button (X) */}
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        
        {/* Menu items */}
        <ul className="menu-items">
          <li onClick={handleGuideClick}>
            <img src="/assets/book-icon.png" alt="Guides" />
            <span>Guides</span>
          </li>
          <li onClick={handleVerificationClick}>
            <img src="/assets/check-icon.png" alt="Verification" />
            <span>Verification</span>
          </li>
          <li>
            <img src="/assets/lightbulb-icon.png" alt="Help" />
            <span>Help</span>
          </li>
        </ul>
      </div>
      
      {/* Guide Popup */}
      <GuidePopup 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
      
      {/* Verification Popup */}
      <VerificationPopup
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />
    </>
  );
}

export default MenuOverlay;
