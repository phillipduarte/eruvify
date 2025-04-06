import React, { useState, useEffect } from 'react';
import './App.css';
import BottomNavigation from './BottomNavigation';
import MenuOverlay from './components/MenuOverlay';

function App() {
  // Total distance for the demo (in miles).
  // Updated to 0.7 to match the pre‑start text.
  const totalDistance = 0.7;

  // Track if the menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Whether the user has started the route
  const [isStarted, setIsStarted] = useState(false);

  // Whether the route is finished
  const [isFinished, setIsFinished] = useState(false);

  // How far the user has walked
  const [distanceWalked, setDistanceWalked] = useState(0);

  // Toggle the side menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Simulate progress once the user starts and hasn't finished
  useEffect(() => {
    if (isStarted && !isFinished) {
      const interval = setInterval(() => {
        setDistanceWalked((prevDistance) => {
          const newDistance = prevDistance + 0.1; // Increment by 0.1 miles
          if (newDistance >= totalDistance) {
            clearInterval(interval);
            setIsFinished(true);
            return totalDistance;
          }
          return newDistance;
        });
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
  }, [isStarted, isFinished, totalDistance]);

  // Calculate the progress percentage for the progress bar
  const progressPercent = (distanceWalked / totalDistance) * 100;

  // Restart everything
  const handleRestart = () => {
    setIsStarted(false);
    setDistanceWalked(0);
    setIsFinished(false);
  };

  // Conditionally render the main content
  const renderContent = () => {
    if (!isStarted) {
      // PRE‑START SCREEN: Updated to match your design
      return (
        <div className="pre-start-content">
          <h2 className="assignment-title">Your Assignment</h2>
          <p className="assignment-distance">0.7 Miles</p>
          <div className="prestart-map-container">
            <img
              src="/assets/map-placeholder-prestart.png"
              alt="Map placeholder"
            />
          </div>
          <button className="start-button" onClick={() => setIsStarted(true)}>
            Start
          </button>
          <button className="request-route-change-button">
            Request route change
          </button>
        </div>
      );
    } else if (isFinished) {
       // End Screen (matches your screenshot)
       return (
        <div className="end-content">
          {/* Great Job image (star + text) */}
          <div className="great-job-image">
            <img
              src="/assets/great-job-star.png"
              alt="Great job!"
              className="great-job-img"
            />
          </div>

          {/* Share label */}
          <h3 className="share-label">Share your check</h3>

          {/* Text area for comments */}
          <textarea
            className="comment-box"
            placeholder="Write your comment here"
          />

          {/* Upload button */}
          <div className="upload-container">
            <button className="upload-button">
              {/* Optional icon, if you have one */}
              <img
                src="/assets/upload-icon.png"
                alt="Upload"
                className="upload-icon"
              />
              Upload image
            </button>
          </div>

          {/* Post button */}
          <button className="post-button">Post</button>

          {/* Optional "Restart" or "Close" logic */}
          <button className="restart-button" onClick={handleRestart}>
            Restart
          </button>
        </div>
      );
    }  else {
      // STARTED SCREEN: Show progress bar, map, and updated buttons
      return (
        <div className="started-content">
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
          <div className="map-container">
            <img
              src="/assets/map-placeholder-started.png"
              alt="Map placeholder"
            />
          </div>
          <div className="bottom-buttons">
            <button className="change-button">Request Change</button>
            <button className="pause-button" onClick={() => setIsStarted(false)}>
              Pause
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="phone">
      <div className="app-container">
        {/* Top Header */}
        <header className="top-bar">
          <div className="header-content">
            <img
              src="/assets/hamburger-menu.png"
              alt="Menu"
              className="menu-icon"
              onClick={toggleMenu}
            />
            <h1 className="header-title">
              {isFinished ? 'Trip Completed' : 'Your Route Today'}
            </h1>
            <img
              src="/assets/notifications-icon.png"
              alt="Notifications"
              className="notifications-icon"
            />
          </div>
        </header>

        {/* Main Content */}
        {renderContent()}

        {/* Bottom Navigation */}
        <BottomNavigation />

        {/* Menu Overlay */}
        <MenuOverlay isOpen={isMenuOpen} onClose={toggleMenu} />
      </div>
    </div>
  );
}

export default App;
