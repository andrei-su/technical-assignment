import { useState } from 'react'
import { Form } from 'react-router-dom';
import { useDispatch } from '../hooks/useDispatch';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

function SignUp() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    if (name === '') {
      e.preventDefault();
      alert('Username is required.')
    } else {
      dispatch({
        type: 'signup',
        userName: name ,
      })
    }
  };

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
        <input 
          type="text" 
          placeholder='name' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <Form
          replace
          action='/home'
          onSubmit={(e) => handleSubmit(e)}
        >
          <button type="submit">Next</button>
        </Form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default SignUp
