import React from 'react';
import './Profile.css';

const Profile = () => {
    // Sample data to ensure there's enough content to scroll
    const badges = Array(9).fill(null);
    
    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p>Welcome to your profile page!</p>
            
            <div className="profile-section">
                <h2>Profile Picture</h2>
                <div className="profile-picture">
                    {/* Placeholder for profile picture */}
                </div>
                <p>User Name</p>
                <p>Member since: January 2023</p>
            </div>
            
            <div className="profile-section">
                <h2>Badges</h2>
                <div className="badges-container">
                    {badges.map((_, index) => (
                        <div className="badge" key={index}>
                            <p>{index + 1}</p>
                        </div>
                    ))}
                </div>
                <p>You've earned 9 badges so far!</p>
            </div>
            
            <div className="profile-section">
                <h2>Activity</h2>
                <div className="graph-container">
                    {/* Placeholder for activity graph */}
                    <p style={{padding: "10px"}}>Activity data visualization</p>
                </div>
            </div>
            
            <div className="profile-section">
                <h2>Statistics</h2>
                <div className="graph-container">
                    {/* Placeholder for statistics */}
                    <p style={{padding: "10px"}}>Your monthly statistics</p>
                </div>
            </div>
            
            <div className="profile-section">
                <h2>Recent Activity</h2>
                <div className="graph-container">
                    {/* Placeholder for recent activity */}
                    <p style={{padding: "10px"}}>Your recent activity</p>
                </div>
            </div>
            
            <div className="profile-section">
                <h2>Settings</h2>
                <button>Edit Profile</button>
                <button style={{marginLeft: "10px"}}>Change Password</button>
            </div>
        </div>
    );
};

export default Profile;