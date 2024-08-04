import React from 'react';
import './App.css';
import WebSocketListener from './WebSocketListener';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebSocketListener wsUrl="ws://localhost:5002" />
      </header>
    </div>
  );
}

export default App;
