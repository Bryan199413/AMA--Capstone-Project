import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
