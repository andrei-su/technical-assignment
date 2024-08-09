import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Conversation from "./pages/Conversation";
import GlobalProvider from "./context/GlobalContext";
import SignUp from "./pages/SignUp";
import SocketProvider from "./context/SocketContext";
import Protected from "./pages/Protected";

const localState = JSON.parse(localStorage.state || null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    element: <Protected isUser={localState?.user?.name !== ''} />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/room",
        element: <Room />,
      },
      {
        path: "/conversation",
        element: <Conversation />,
      },
    ]
  },
]);

function App() {
  return (
    <GlobalProvider>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </GlobalProvider>
  )
}

export default App
