import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar'
import { ThemeContext } from './ThemeContext';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('espresso');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={"App theme-" + theme}>
        <TopBar />
        <div className='main'></div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
