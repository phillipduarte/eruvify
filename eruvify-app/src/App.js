import React from 'react';
import './App.css';
import BottomNavigation from './BottomNavigation';

function App() {
  return (
    <div className="phone">
      <div className="app-container">
        {/* Top Header */}
        <header className="top-bar">
          <h1>Your Route Today</h1>
        </header>
        
        {/* Subheader row */}
        <div className="info-row">
          <span className="distance">0.9 Miles</span>
          <button className="walkthrough-button">View Walkthrough</button>
        </div>
        
        {/* Map placeholder */}
        <div className="map-container">
          {/* Replace the src below with your actual map image path or a placeholder */}
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
