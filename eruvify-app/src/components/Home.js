import React from 'react';
import './Home.css'; 

const Home = ({ posts = [] }) => {
  // Dummy posts data that will always be shown
  const dummyPosts = [
    {
      id: 'dummy-1',
      username: "Sarah_J",
      comment: "Just checked my eruv using the app - all clear for this Shabbat!",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2576&auto=format&fit=crop"
    },
    {
      id: 'dummy-2',
      username: "Rabbi_David",
      comment: "Important community announcement: The eruv near Cedar Park has been repaired. Thanks to our volunteers!",
      time: "5 hours ago"
    },
    {
      id: 'dummy-3',
      username: "JewishCampus",
      comment: "Eruv check schedule for this month is now posted. Sign up to help!",
      time: "1 day ago",
      image: "https://images.unsplash.com/photo-1577033217221-2b949079c374?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 'dummy-4',
      username: "Rebecca_L",
      comment: "Question: Is anyone else having trouble viewing the map in the northwest section?",
      time: "2 days ago"
    }
  ];

  // Combine user posts with dummy posts
  // User posts will appear first, followed by dummy posts
  const displayPosts = [...posts, ...dummyPosts];
  
  return (
    <div className="home-screen">
      <h2>Home</h2>
      {displayPosts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">{post.username}</div>
          {post.image && (
            <img src={post.image} alt="User post" className="post-image" />
          )}
          <p className="post-comment">{post.comment}</p>
          <p className="post-time">{post.time}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;