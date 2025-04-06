import React, { useState, useEffect } from 'react';
import './App.css';
import BottomNavigation from './BottomNavigation';
import MenuOverlay from './components/MenuOverlay';

function App() {
  // Total distance for the demo (in miles)
  const totalDistance = 0.9;

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

  // Calculate progress percentage
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
      // Pre-Start Screen
      return (
        <div className="pre-start-content">
          <div className="map-container">
            <img src="/assets/map-placeholder.png" alt="Map placeholder" />
          </div>
          <div className="bottom-buttons">
            <button className="start-button" onClick={() => setIsStarted(true)}>
              Start
            </button>
          </div>
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
    } else {
      // Started Screen: Show progress bar, map, etc.
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
        {/* Top Bar */}
        <header className="top-bar">
          <div className="header-content">
            {/* If you don't want the hamburger icon here, remove it */}
            <img
              src="/assets/hamburger-menu.png"
              alt="Menu"
              className="menu-icon"
              onClick={toggleMenu}
            />
            <h1 className="header-title">
              {isFinished ? "Complete!" : "Your Route Today"}
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

        {/* Overlay Menu */}
        <MenuOverlay isOpen={isMenuOpen} onClose={toggleMenu} />
      </div>
    </div>
  );
}

export default App;
