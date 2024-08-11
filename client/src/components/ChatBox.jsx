import { useEffect, useState } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useSocketContext } from '../hooks/useSocketContext';
import { useDispatch } from '../hooks/useDispatch';

function ChatBox() {
  const state = useGlobalContext();
  const socket = useSocketContext();
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket?.on('receiveMessage', message => {
      dispatch({ type: 'addMessageInConversation', conversation : { id: '1', message }});
    });
  }, [dispatch, socket]);

  useEffect(() => {
    if (state.conversations.length > 0) {
      setMessages(state.conversations[0].messages)
    }
  }, [state.conversations]);

  useEffect(() => {
    dispatch({ type: 'createConversation', conversation : { id: '1' } });
  }, [dispatch]);

  const sendMessage = () => {
    if(messageInput) {
      socket.emit('sendMessage', messageInput, () => setMessageInput(''));
      dispatch({ type: 'addMessageInConversation', conversation : { id: '1', message: messageInput}});
    }
  }

  const logout = () => {
    dispatch({ type: 'logout' });
  };

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
        <button onClick={logout}>Logout</button>
      </div>

    </>
  )
}

export default ChatBox
