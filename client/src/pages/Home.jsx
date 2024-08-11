import { useGlobalContext } from '../hooks/useGlobalContext'
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

function Home() {
  const state = useGlobalContext();

  return (
    <>
      <h2>Welcome {state.user.name}</h2>
      <h4>Now {state.user.name}, in order to start chatting 
        with someone you can either search and pick another 
        user from the list on the left-hand side, or you can 
        simply create a chat room or join an existing chat 
        room. It&apos;s up to you 😉</h4>

        <Container>
          <Sidebar />
          <ChatBox />
        </Container>

    </>
  )
}

export default Home;

const Container = styled.div`
  display: flex;
`;
