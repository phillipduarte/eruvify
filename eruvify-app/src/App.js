import React, { useState, useEffect } from 'react';
import './App.css';
import BottomNavigation from './BottomNavigation';
import MenuOverlay from './components/MenuOverlay';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  // Total distance for the demo (in miles)
  const totalDistance = 0.7;

  // Track if the menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Whether the user has started the route
  const [isStarted, setIsStarted] = useState(false);

  // Whether the route is finished
  const [isFinished, setIsFinished] = useState(false);

  // Whether the report issue screen is active
  const [isReporting, setIsReporting] = useState(false);

  // How far the user has walked
  const [distanceWalked, setDistanceWalked] = useState(0);

  // activeScreen: "trip" (for all screens related to the trip flow) or "home"
  const [activeScreen, setActiveScreen] = useState('trip');

  // Each post is an object with comment, image, dummy username, and time
  const [posts, setPosts] = useState([]);

  // for capturing user inputs in end screen
  const [comment, setComment] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  // Toggle the side menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Simulate progress once the user starts and hasn't finished or entered report mode
  useEffect(() => {
    if (isStarted && !isFinished && !isReporting) {
      const interval = setInterval(() => {
        setDistanceWalked((prevDistance) => {
          const newDistance = prevDistance + 0.1; // Increment by 0.1 miles
          if (newDistance >= totalDistance) {
            clearInterval(interval);
            setTimeout(() => {
              setIsFinished(true);
            }, 2000); // Wait 2 seconds before setting finished
            return totalDistance;
          }
          return newDistance;
        });
      }, 2000); // Update every second

      return () => clearInterval(interval);
    }
  }, [isStarted, isFinished, totalDistance, isReporting]);

  // Calculate progress percentage
  const progressPercent = (distanceWalked / totalDistance) * 100;

  // Restart everything
  const handleRestart = () => {
    setIsStarted(false);
    setDistanceWalked(0);
    setIsFinished(false);
    setIsReporting(false);
  };

  // Determine the map placeholder based on progress
  const getMapPlaceholder = () => {
    if (distanceWalked >= totalDistance / 2 && distanceWalked < totalDistance * 0.9) {
      return '/assets/map-placeholder-mid.png';
    } else if (distanceWalked >= totalDistance) {
      return '/assets/map-placeholder-end.png';
    }
    return '/assets/map-placeholder-started.png';
  };

  // Handle image upload from the file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for previewing the image
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  // Handle post submission from the end screen
  const handlePostSubmit = () => {
    // Create a new post object; using dummy data for username & time
    const newPost = {
      id: Date.now(),
      username: 'David Lee',
      time: new Date().toLocaleTimeString(),
      comment: comment,
      image: uploadedImage
    };

  // Update posts state
  setPosts([...posts, newPost]);

  // Clear the input states
  setComment('');
  setUploadedImage(null);

  // Optionally, reset the trip state (or you can keep the completed trip UI until the next trip)
  handleRestart();

  // Switch to the Home screen so the user can see their post
  setActiveScreen('home');
};

  // Render the main content based on the current state
  const renderContent = () => {
    if (!isStarted) {
      // PRE‑START SCREEN
      return (
        <div className="pre-start-content">
          <h2 className="assignment-title">Your Assignment</h2>
          <p className="assignment-distance">0.7 Miles</p>
          <div className="prestart-map-container">
            <img src="/assets/map-placeholder-prestart.png" alt="Map placeholder" />
          </div>
          <button className="start-button" onClick={() => setIsStarted(true)}>
            Start
          </button>
          <button className="request-route-change-button">
            Request route change
          </button>
        </div>
      );
    } else if (isReporting) {
      // REPORT ISSUE SCREEN
      return (
        <div className="report-issue-content">
          <div className="report-issue-header">
            <button className="cancel-button" onClick={() => setIsReporting(false)}>
              <img src="/assets/cancel-icon.png" alt="Cancel" className="cancel-icon" />
            </button>
            <div className="report-progress-container">
              {/* If you want to include a small "Progress" label, uncomment the next line */}
              <span className="progress-label">Progress</span> 
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
          </div>

          <div className="report-issue-form">
            {/* Placeholder image before the form */}
            <div className="capture-placeholder-container">
              <img
                src="/assets/capture-placeholder.png"
                alt="Capture placeholder"
                className="capture-placeholder"
              />
            </div>

            {/* Textarea for describing the issue */}
            <textarea
              className="report-textarea"
              placeholder="Describe your issue here"
            ></textarea>

            {/* Submit button */}
            <button className="submit-report-button">Submit Report</button>
          </div>
        </div>
      );
    } else if (isFinished) {
      // END SCREEN
      return (
        <div className="end-content">
          <div className="great-job-image">
            <img
              src="/assets/great-job-star.png"
              alt="Great job!"
              className="great-job-img"
            />
          </div>
          <h3 className="share-label">Share your check</h3>
          <textarea
            className="comment-box"
            placeholder="Write your comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="upload-container">
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="uploadImageInput"
              onChange={handleImageUpload}
            />
            <label htmlFor="uploadImageInput" className="upload-button">
              <img
                src="/assets/upload-icon.png"
                alt="Upload"
                className="upload-icon"
              />
              Upload image
            </label>
          </div>
          <button className="post-button" onClick={handlePostSubmit}>
            Post
          </button>
          <button className="restart-button" onClick={handleRestart}>
            Restart
          </button>
        </div>
      );
    } else {
      // STARTED SCREEN
      return (
        <div className="started-content">
          <div className="progress-section">
            <label className="progress-label">Progress</label>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="progress-range">
              <span>0.0 mi</span>
              <span>{totalDistance} mi</span>
            </div>
          </div>
          <div className="map-container">
            <img src={getMapPlaceholder()} alt="Map placeholder" />
          </div>
          <div className="bottom-buttons">
            <button className="pause-button" onClick={() => setIsStarted(false)}>
              Pause
            </button>
            <button className="report-issue-button" onClick={() => setIsReporting(true)}>
              Report Issue
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
        {activeScreen === 'home' ? (
          <Home posts={posts} />
        ) : activeScreen === 'profile' ? (
          <Profile />
        ) : (
          renderContent()
        )}

        {/* Bottom Navigation */}
        <BottomNavigation activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

        {/* Menu Overlay */}
        <MenuOverlay isOpen={isMenuOpen} onClose={toggleMenu} />
      </div>
    </div>
  );
}

export default App;
