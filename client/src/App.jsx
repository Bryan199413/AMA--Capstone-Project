import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const {authUser} = useAuthContext();
  return (
    <div>
        <Routes>
          <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>} />
          <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Signup/>} />
          <Route path="/" element={authUser ? <Home/> : <Navigate to="/login"/>} />
          <Route path="*" element={<PageNotFound/>} /> 
        </Routes>
        <Toaster/>
    </div>
  )
}

export default App

