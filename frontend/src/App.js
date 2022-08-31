import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar'
import { ThemeContext } from './contexts/ThemeContext';
import { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { UserProvider } from './contexts/UserContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={"App theme-" + theme}>
      <UserProvider>
        <TopBar />
        <div className='main'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
