import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar'
import { ThemeContext } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
          <button onClick={() => <Navigate to='/login' />}>LOGIN</button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
