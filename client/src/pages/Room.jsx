import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import io from 'socket.io-client'
import '../App.css'

const ENDPOINT = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
let socket;

function Room() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT, { transports : ['websocket'] });

    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
  }, []);

  const sendMessage = () => {
    if(messageInput) {
      socket.emit('message', messageInput, () => setMessageInput(''));
    }
  }

  return (
    <>
      <h2>Welcome to the Real Time Chat App technical assignment</h2>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>
        First of all please let us know how we should call you
      </h3>
      <div className="card">
        {/* <h3>
          First of all please let us know how we should call you
        </h3> */}
        <h3>
          Socket.io chat box
        </h3>
        <div>{messages.map( (message, i) => <div key={message + i}>{message}</div>)}</div>
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

export default Room
