import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar'
import { ThemeContext } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [theme, setTheme] = useState('espresso');

  useEffect(() => {
    const currentTheme = localStorage.getItem('current-theme'); // localStorage saves theme on page reload
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={"App theme-" + theme}>
        <TopBar />
        <div className='main'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
