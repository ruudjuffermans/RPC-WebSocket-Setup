import React, { useEffect, useState } from 'react';

const WebSocketListener = ({ wsUrl }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket(wsUrl);

    // Connection opened
    socket.addEventListener('open', (event) => {
      console.log('WebSocket is connected.');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      setMessages(prev => [...prev, event.data]);
    });

    // Listen for possible errors
    socket.addEventListener('error', (error) => {
      console.log('WebSocket error: ', error);
    });

    // Connection closed
    socket.addEventListener('close', (event) => {
      console.log('WebSocket is closed now.');
    });

    // Update the WebSocket state
    setWs(socket);

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, [wsUrl]); // Only re-run the effect if wsUrl changes

  return (
    <div>
      <h2>WebSocket Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketListener;
