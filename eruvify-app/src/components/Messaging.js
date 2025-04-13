import React, { useState } from 'react';
import './Messaging.css';

const Messaging = () => {
  // Sample conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Rabbi Cohen',
      lastMessage: 'Thanks for checking the north side eruv yesterday!',
      time: '10:30 AM',
      unread: true
    },
    {
      id: 2,
      name: 'Sarah Goldstein',
      lastMessage: 'Are you available to check the eruv on Cedar Ave this week?',
      time: 'Yesterday',
      unread: false
    },
    {
      id: 3,
      name: 'Community Group',
      lastMessage: 'David: I found a broken wire near the park entrance.',
      time: 'Tuesday',
      unread: true
    },
    {
      id: 4,
      name: 'Eruv Committee',
      lastMessage: 'Meeting scheduled for Sunday at 4pm to discuss maintenance.',
      time: 'Monday',
      unread: false
    },
    {
      id: 5,
      name: 'Michael Levy',
      lastMessage: 'Can you help me understand how to report an issue?',
      time: 'Last week',
      unread: false
    }
  ]);

  // Selected conversation for the chat view
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  // Message input
  const [messageInput, setMessageInput] = useState('');

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    
    // Mark as read when selected
    setConversations(conversations.map(c => 
      c.id === conversation.id ? {...c, unread: false} : c
    ));
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;
    
    // In a real app, you would send this to a backend
    console.log('Sending message:', messageInput);
    
    // Clear input
    setMessageInput('');
  };

  // Go back to conversations list
  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="messaging-container">
      {selectedConversation ? (
        // Chat view
        <div className="chat-view">
          <div className="chat-header">
            <button className="back-button" onClick={handleBackToList}>
              ←
            </button>
            <h3>{selectedConversation.name}</h3>
          </div>
          
          <div className="messages-list">
            <div className="message-date-divider">Today</div>
            
            <div className="message received">
              <div className="message-bubble">
                Hello there! How is your eruv checking going?
              </div>
              <div className="message-time">10:30 AM</div>
            </div>
            
            <div className="message sent">
              <div className="message-bubble">
                Going well! I'm about halfway through my route.
              </div>
              <div className="message-time">10:32 AM</div>
            </div>
            
            <div className="message received">
              <div className="message-bubble">
                {selectedConversation.lastMessage}
              </div>
              <div className="message-time">{selectedConversation.time}</div>
            </div>
          </div>
          
          <form className="message-input-container" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="message-input"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      ) : (
        // Conversations list view
        <>
          <h2>Messages</h2>
          <div className="conversations-list">
            {conversations.map(conversation => (
              <div 
                key={conversation.id} 
                className={`conversation-item ${conversation.unread ? 'unread' : ''}`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="conversation-avatar">
                  {conversation.name.charAt(0)}
                </div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <h4>{conversation.name}</h4>
                    <span className="conversation-time">{conversation.time}</span>
                  </div>
                  <p className="conversation-preview">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && <div className="unread-indicator"></div>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Messaging;