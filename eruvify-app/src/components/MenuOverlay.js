// MenuOverlay.js
import React from 'react';
import './MenuOverlay.css';

function MenuOverlay({ isOpen, onClose }) {
  // If not open, render nothing or keep hidden
  // We'll handle it with CSS transitions so we can keep it in the DOM
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
            <span>ERUVIFY</span>
          </div>
          {/* Close button (X) */}
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        
        {/* Menu items */}
        <ul className="menu-items">
          <li>
            <img src="/assets/book-icon.png" alt="Guides" />
            <span>Guides</span>
          </li>
          <li>
            <img src="/assets/check-icon.png" alt="Verification" />
            <span>Verification</span>
          </li>
          <li>
            <img src="/assets/lightbulb-icon.png" alt="Help" />
            <span>Help</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuOverlay;
