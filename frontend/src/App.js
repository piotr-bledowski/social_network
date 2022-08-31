import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar'
import { ThemeContext } from './contexts/ThemeContext';
import { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <AuthProvider>
      <div className={"App theme-" + theme}>
        <TopBar />
        <div className='main'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
