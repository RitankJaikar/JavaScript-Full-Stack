import './App.css'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/Login'
import Profile from './components/Profile'


function App() {
  return (
    <UserContextProvider>
      <Login />
      <br />
      <Profile />
    </UserContextProvider>
  )
}

export default App



//without context api
/*function App() {
  const [user, setUser] = useState(null); // Managing the user state in App component

  return (
    <div>
      // Pass down setUser to Login, and user to Profile as props 
      <Login setUser={setUser} />
      <Profile user={user} />
    </div>
  );
}*/
