import { useState } from 'react';
import './App.css'
import LoginWrapper from './components/LoginWrapper';
import ProfileWrapper from './components/ProfileWrapper';
import { UserContextProvider } from './context/UserContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContextProvider value={{user, setUser}}>
        <LoginWrapper />
        <ProfileWrapper />
      </UserContextProvider>
    </>
  )
}

export default App;