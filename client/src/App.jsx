import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import io from 'socket.io-client'
import './App.css'

const ENDPOINT = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

function App() {
  const [messageInput, setMessageInput] = useState('');
  const [message, setMessage] = useState('');

  const socket = io(ENDPOINT, { transports : ['websocket'] });

  useEffect(() => {
    socket.on('receiveMessage', message => {
      setMessage(message);
    });
  }, [socket]);

  const sendMessage = () => {
    if(messageInput) {
      socket.emit('sendMessage', messageInput, () => setMessageInput(''));
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <h3>
          Socket.io chat box
        </h3>
        <div>{message}</div>
        <input type="text" placeholder='message' value={messageInput} onChange={(e) => setMessageInput(e.target.value)}/>
        <button onClick={(e) => sendMessage(e)}>Send</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
