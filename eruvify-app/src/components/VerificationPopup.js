import React from 'react';
import './VerificationPopup.css';

function VerificationPopup({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="verification-overlay">
      <div className="verification-popup">
        <div className="verification-header">
          <h2>Eruv Verification Contacts</h2>
          <button className="verification-close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="verification-content">
          <div className="contact-section">
            <h3>Rabbi Contacts</h3>
            <div className="contact-card">
              <div className="contact-avatar">
                <img src="/assets/rabbi-avatar.png" alt="Rabbi" className="contact-image" />
              </div>
              <div className="contact-details">
                <h4>Rabbi David Cohen</h4>
                <p className="contact-title">Senior Rabbi, Beth Israel Congregation</p>
                <div className="contact-info">
                  <p><strong>Phone:</strong> (215) 555-1234</p>
                  <p><strong>Email:</strong> rabbi.cohen@bethisrael.org</p>
                  <p><strong>Office Hours:</strong> Mon-Thu 9am-4pm</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-section">
            <h3>Eruv Maintenance Manager</h3>
            <div className="contact-card">
              <div className="contact-avatar">
                <img src="/assets/manager-avatar.png" alt="Manager" className="contact-image" />
              </div>
              <div className="contact-details">
                <h4>Sarah Goldstein</h4>
                <p className="contact-title">Eruv Committee Chairperson</p>
                <div className="contact-info">
                  <p><strong>Phone:</strong> (215) 555-5678</p>
                  <p><strong>Email:</strong> eruv@bethisrael.org</p>
                  <p><strong>Weekly Inspections:</strong> Thursdays</p>
                  <p><strong>Emergency Contact:</strong> Available 24/7 for eruv emergencies</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-section">
            <h3>Emergency Reporting</h3>
            <p className="emergency-info">
              If you notice a broken eruv line or other issue that requires immediate attention, 
              please contact the Eruv Hotline at <strong>(215) 555-ERUV</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationPopup;