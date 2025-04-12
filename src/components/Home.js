import React from 'react';
import './Home.css'; 

const Home = ({ posts }) => {
  return (
    <div className="home-screen">
      <h2>Home</h2>
      {posts.length === 0 ? (
        <p className="no-posts-msg">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">{post.username}</div>
            {post.image && (
                <img src={post.image} alt="User post" className="post-image" />
            )}
            <p className="post-comment">{post.comment}</p>
            <p className="post-time">{post.time}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;