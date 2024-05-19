import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import { Toaster} from 'sonner'
import { useAuthContext } from './context/AuthContext';
import useListenMessages from './hooks/useListenMessages';
import useListenRoom from './hooks/useListenRoom';
import useListenFriendRequest from './hooks/useListenFriendRequest';
import useListenFriend from './hooks/useListenFriend';
import useListenConversations from './hooks/useListenConversations';
import { useEffect } from 'react';
import useTheme from './zustand/useTheme';

function App() {
  const {authUser} = useAuthContext();
  const {theme} = useTheme();
  useListenMessages();
  useListenRoom();
  useListenFriendRequest();
  useListenFriend();
  useListenConversations();
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  
  return (
    <div className='font-open-sans'>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authUser ?  <Navigate to='/' /> : <Signup />} />
          <Route path="*" element={<PageNotFound/>} /> 
        </Routes>
        <Toaster position="top-right" richColors />
    </div>
  )
}

export default App

