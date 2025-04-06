import React, { useState } from 'react';
import './App.css';
import BottomNavigation from './BottomNavigation';

function App() {
  // For demo: total distance is 0.9 miles
  const totalDistance = 0.9;

  // For demo: track how much distance the user has walked
  // e.g., 0.0 for "Started," 0.45 for "Midwalk," etc.
  const [distanceWalked, setDistanceWalked] = useState(0);

  // Calculate progress as a percentage
  const progressPercent = (distanceWalked / totalDistance) * 100;
  return (
    <div className="phone">
      <div className="app-container">
        {/* Top Header */}
        <header className="top-bar">
          <h1>Your Route Today</h1>
        </header>
        
        {/* Progress Bar Section */}
        <div className="progress-section">
          <label className="progress-label">Progress</label>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="progress-range">
            <span>0.0 mi</span>
            <span>{totalDistance} mi</span>
          </div>
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
