import { createContext, useEffect, useState } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import io from 'socket.io-client'

const ENDPOINT = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
	const [socketState, setSocketState] = useState(null);
  const state = useGlobalContext();

  useEffect(() => {
    if (state.user.name !== '') {
      const socket = io(ENDPOINT, { transports : ['websocket'] });

      setSocketState(socket);

      socket.on('connect', () => {
        socket.emit('signup', state.user.name, (error) => {
          if(error) {
            alert(error);
          }
        });
      });

      return () => socket.close();
    } else {
      if (socketState) {
        socketState.close();
        setSocketState(null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user.name]);

  return (
    <SocketContext.Provider value={socketState}>
      {children}
    </SocketContext.Provider>

  )
};

export default SocketProvider;
