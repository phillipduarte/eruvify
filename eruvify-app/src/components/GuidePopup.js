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
                <a href="https://www.youtube.com/watch?v=Ojdu1YDwPdc" target="_blank" rel="noopener noreferrer" className="guide-link">How to check an eruv</a>
              </li>
              <li className="guide-item">
                <img src="/assets/video-icon.png" alt="Video" className="guide-icon" />
                <a href="https://www.youtube.com/watch?v=gPAtbRormZI" target="_blank" rel="noopener noreferrer" className="guide-link">Understanding eruv boundaries</a>
              </li>
              <li className="guide-item">
                <img src="/assets/video-icon.png" alt="Video" className="guide-icon" />
                <a href="https://www.youtube.com/watch?v=6RI4wCu4M8I" target="_blank" rel="noopener noreferrer" className="guide-link">Rabbi explaining eruv requirements</a>
              </li>
            </ul>
          </div>
          
          <div className="guide-section">
            <h3>Text Guides</h3>
            <ul className="guide-list">
              <li className="guide-item">
                <img src="/assets/document-icon.png" alt="Document" className="guide-icon" />
                <a href="https://www.chabad.org/library/article_cdo/aid/815222/jewish/What-Is-an-Eruv.htm" target="_blank" rel="noopener noreferrer" className="guide-link">Beginner's guide to eruv concepts</a>
              </li>
              <li className="guide-item">
                <img src="/assets/document-icon.png" alt="Document" className="guide-icon" />
                <a href="https://www.star-k.org/articles/kashrus-kurrents/515/the-modern-day-eruv/" target="_blank" rel="noopener noreferrer" className="guide-link">Modern day eruv construction</a>
              </li>
              <li className="guide-item">
                <img src="/assets/document-icon.png" alt="Document" className="guide-icon" />
                <a href="https://www.ou.org/life/ritual/laymans_guide_eruv/" target="_blank" rel="noopener noreferrer" className="guide-link">Halachic requirements for eruvim</a>
              </li>
              <li className="guide-item">
                <img src="/assets/document-icon.png" alt="Document" className="guide-icon" />
                <a href="https://www.myjewishlearning.com/article/eruv/" target="_blank" rel="noopener noreferrer" className="guide-link">FAQ about eruvim</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidePopup;