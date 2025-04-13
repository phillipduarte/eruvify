import React from 'react';
import './BottomNavigation.css';

function BottomNavigation({ activeScreen, setActiveScreen }) {
  return (
    <nav className="bottom-nav">
      <ul className="nav-items">
        <li
          className={`nav-item ${activeScreen === 'home' ? 'active' : ''}`}
          onClick={() => setActiveScreen('home')}
        >
          <img src="/assets/home-icon.png" alt="Home" className="nav-icon" />
          {/* <span>Home</span> */}
        </li>
        <li
          className={`nav-item ${activeScreen === 'trip' ? 'active' : ''}`}
          onClick={() => setActiveScreen('trip')}
        >
          <img src="/assets/map-icon.png" alt="Map" className="nav-icon" />
          {/* <span>Map</span> */}
        </li>
        <li
          className={`nav-item ${activeScreen === 'check' ? 'active' : ''}`}
          onClick={() => setActiveScreen('check')}
        >
          <img src="/assets/check-icon.png" alt="Check" className="nav-icon" />
          {/* <span>Check</span> */}
        </li>
        <li
          className={`nav-item ${activeScreen === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveScreen('messages')}
        >
          <img src="/assets/messages-icon.png" alt="Messages" className="nav-icon" />
          {/* <span>Messages</span> */}
        </li>
        <li
          className={`nav-item ${activeScreen === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveScreen('profile')}
        >
          <img src="/assets/profile-icon.png" alt="Profile" className="nav-icon" />
          {/* <span>Profile</span> */}
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavigation;
