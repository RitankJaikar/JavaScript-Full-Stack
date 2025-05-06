import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import service from './appwrite/configuration';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';
import { managePosts } from './store/postSlice';

function App() {
  //when fetching data from appwrite, it may take time
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}))
          service.getPosts([])
            .then((res) => {
              // console.log("posts", res.documents);
              dispatch(managePosts(res.documents));
            })
            .catch((err) => {
              dispatch(managePosts([]));
              console.log("Failed to fetch posts :: ", err.message);
            })
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700'>
      <div className='w-full min-h-screen flex flex-col'>
        <Header />
          <main className='flex-grow'>
            <Outlet />
          </main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App;