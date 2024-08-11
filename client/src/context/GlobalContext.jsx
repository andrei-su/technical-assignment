import { createContext, useEffect, useReducer } from 'react';

const initialState = {
  user: {
    name: '',
  },
  rooms: [],
  conversations: [],
}
const localState = JSON.parse(localStorage.state || null);

export const GlobalContext = createContext(initialState);
export const GlobalDispatchContext = createContext(null);

function globalReducer(state, action) {
  switch (action.type) {
    case 'signup': {
      return {
        ...state,
        user: {
          name: action.userName, 
        },
      }
    }
    case 'logout': {
      return initialState;
    }
    case 'createConversation': {
      const conversation = { id: action.conversation.id, messages: [] }

      return {
        ...state,
        conversations: [...state.conversations, conversation],
      }
    }
    case 'addMessageInConversation': {
      const conversations = [...state.conversations];
      const conversationIndex = conversations.findIndex(conversation => conversation.id === action.conversation.id);
      if (conversationIndex !== -1) {
        conversations[conversationIndex].messages.push(action.conversation.message);
      }

      return {
        ...state,
        conversations,
      }
    }
    default: {
      throw new Error(`Invalid action ${action.type}`)
    }
  }
}

// eslint-disable-next-line react/prop-types
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, localState || initialState);

  useEffect(() => {
    localStorage.state = JSON.stringify(state);
  }, [state]);

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>

  )
};

export default GlobalProvider;
