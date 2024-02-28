import { Routes, Route, redirect } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound/>} /> 
        </Routes>
        <Toaster/>
    </div>
  )
}

export default App