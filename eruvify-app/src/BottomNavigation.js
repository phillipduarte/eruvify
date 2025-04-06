import React from 'react';
import './BottomNavigation.css';

function BottomNavigation() {
  return (
    <nav className="bottom-nav">
      <ul className="nav-items">
        <li className="nav-item">
          <img src="/placeholder-icon.png" alt="Home" className="nav-icon" />
          {/* <span>Home</span> */}
        </li>
        <li className="nav-item">
          <img src="/placeholder-icon.png" alt="Map" className="nav-icon" />
          {/* <span>Map</span> */}
        </li>
        <li className="nav-item">
          <img src="/placeholder-icon.png" alt="Check" className="nav-icon" />
          {/* <span>Check</span> */}
        </li>
        <li className="nav-item">
          <img src="/placeholder-icon.png" alt="Notifications" className="nav-icon" />
          {/* <span>Notifications</span> */}
        </li>
        <li className="nav-item">
          <img src="/placeholder-icon.png" alt="Profile" className="nav-icon" />
          {/* <span>Profile</span> */}
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavigation;
