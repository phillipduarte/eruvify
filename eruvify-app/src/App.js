import React from 'react';
import './App.css';
import BottomNavigation from './BottomNavigation';

function App() {
  return (
    <div className="phone">
      <div className="app-container">
        {/* Top Header */}
        <header className="top-bar">
          <div className="header-content">
            <img src="/assets/hamburger-menu.png" alt="Menu" className="menu-icon" />
            <h1 className="header-title">Your Route Today</h1>
            <img src="/assets/notifications-icon.png" alt="Notifications" className="notifications-icon" />
          </div>
        </header>
        
        {/* Subheader row */}
        <div className="info-row">
          <span className="distance">0.9 Miles</span>
          <button className="walkthrough-button">View Walkthrough</button>
        </div>
        
        {/* Map placeholder */}
        <div className="map-container">
          <img src="/map-placeholder.png" alt="Map placeholder" />
        </div>
        
        {/* Bottom buttons */}
        <div className="bottom-buttons">
          <button className="change-button">Request Change</button>
          <button className="start-button">Start</button>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;
