import { createContext, useEffect } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import io from 'socket.io-client'

const ENDPOINT = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
let socket;

export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
  // const [socket, setSocket] = useState(null);
  const state = useGlobalContext();

  useEffect(() => {
    if (state.user.name !== '') {
      socket = io(ENDPOINT, { transports : ['websocket'] });

      return () => socket.close();
    }
  }, [state.user.name]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>

  )
};

export default SocketProvider;
