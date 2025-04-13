import React from 'react';
import './RouteChangePopup.css';

function RouteChangePopup({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  
  return (
    <div className="route-change-overlay">
      <div className="route-change-popup">
        <div className="route-change-header">
          <h2>Request Route Change</h2>
          <button className="route-change-close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="route-change-content">
          <p className="route-change-message">
            Are you sure you want to request a different eruv checking route?
          </p>
          <p className="route-change-info">
            Your request will be sent to the eruv committee coordinators who will review and respond as soon as possible.
          </p>
          
          <div className="route-change-buttons">
            <button className="route-change-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="route-change-confirm" onClick={onConfirm}>
              Confirm Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteChangePopup;