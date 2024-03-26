import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import useListenMessages from './hooks/useListenMessages';

function App() {
  const {authUser} = useAuthContext();
  useListenMessages();
  return (
    <div className='font-open-sans'>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authUser ?  <Navigate to='/' /> : <Signup />} />
          <Route path="*" element={<PageNotFound/>} /> 
        </Routes>
        <Toaster/>
    </div>
  )
}

export default App

