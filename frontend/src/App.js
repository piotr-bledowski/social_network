import './App.css';
import TopBar from './components/TopBar'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import { UserProvider } from './contexts/UserContext';
import { useTheme } from './utils/hooks'
import GroupPageWrapper from './pages/GroupPageWrapper';
import GroupMenu from './components/groups/GroupMenu';

function App() {
  const { theme } = useTheme();

  return (
    <div className={"App theme-" + theme}>
      <UserProvider>
        <TopBar />
        <div className='background'></div>
        <div className='main'>
          <span className='left-bar side-bar'>
            <GroupMenu />
          </span>
          <span className='feed'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/profile/:user' element={<ProfilePage />} />
              <Route path='/post/:id' element={<PostPage />} />
              <Route path='/group/:name' element={<GroupPageWrapper />} />
            </Routes>
          </span>
          <span className='right-bar side-bar'></span>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;