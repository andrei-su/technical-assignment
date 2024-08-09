import { useEffect, useState } from 'react'
import { useDispatch } from '../hooks/useDispatch';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useSocketContext } from '../hooks/useSocketContext';
import { useNavigate } from 'react-router-dom';

function ChatBox() {
  const state = useGlobalContext();
  const socket = useSocketContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket?.on('receiveMessage', message => {
      setMessages(messages => [ ...messages, message ]);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('logout', (logoutMessage) => {
      console.log(logoutMessage);
      
      navigate("/");
    });
  }, [navigate, socket]);

  const sendMessage = () => {
    if(messageInput) {
      socket?.emit('sendMessage', messageInput, () => setMessageInput(''));
      // dispatch({ type: 'addMessageInConversation', conversation : { id: '1', message: messageInput}});
      // setMessages(messages => [ ...messages, messageInput ]);

    }
  }

  return (
    <>
      <div className="card">
        <h3>
          Socket.io chat box
        </h3>
        <div>{messages.map( (message, i) => <div key={message + i}>{message}</div>)}</div>
        <input
          type="text"
          placeholder='message'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={(e) => sendMessage(e)}>Send</button>
      </div>

    </>
  )
}

export default ChatBox
