import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import { AuthProvider } from './contexts/AuthContext';
import MyProfile from './views/MyProfile';
import Login from './views/Login';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact index element={<Home />} />
          <Route exact path={"my-profile"} element={<MyProfile />} />
          <Route exact path={"login"} element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
