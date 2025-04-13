import React from 'react';
import './GuidePopup.css';

function GuidePopup({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="guide-overlay">
      <div className="guide-popup">
        <div className="guide-header">
          <h2>Eruv Guides</h2>
          <button className="guide-close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="guide-content">
          <div className="guide-section">
            <h3>Video Guides</h3>
            <ul className="guide-list">
              <li className="guide-item">
                <img src="/assets/video-icon.png" alt="Video" className="guide-icon" />
                <a href="#" className="guide-link">How to check an eruv</a>
              </li>
              <li className="guide-item">
                <img src="/assets/video-icon.png" alt="Video" className="guide-icon" />
                <a href="#" className="guide-link">Understanding eruv boundaries</a>
              </li>
              <li className="guide-item">
                <img src="/assets/video-icon.png" alt="Video" className="guide-icon" />
                <a href="#" className="guide-link">Reporting problems with an eruv</a>
              </li>
            </ul>
          </div>
          
          <div className="guide-section">
            <h3>Text Guides</h3>
            <ul className="guide-list">
              <li className="guide-item">
                <img src="/assets/document-icon.png" alt="Document" className="guide-icon" />
                <a href="#" className="guide-link">Beginner's guide to eruv checking</a>
              </li>
              <li className="guide-item">
                <img src="/assets/document-icon.png" alt="Document" className="guide-icon" />
                <a href="#" className="guide-link">Common eruv problems and solutions</a>
              </li>
              <li className="guide-item">
                <img src="/assets/document-icon.png" alt="Document" className="guide-icon" />
                <a href="#" className="guide-link">Halachic requirements for eruvim</a>
              </li>
              <li className="guide-item">
                <img src="/assets/document-icon.png" alt="Document" className="guide-icon" />
                <a href="#" className="guide-link">FAQ about eruvim</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidePopup;