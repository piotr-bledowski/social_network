import './App.css';
import TopBar from './components/TopBar'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import { useTheme, useUser } from './utils/hooks'
import GroupPageWrapper from './pages/GroupPageWrapper';
import GroupMenu from './components/groups/GroupMenu';
import SearchPage from './pages/SearchPage';
import FriendList from './components/messenger/FriendsList';
import { ConversationSetupProvider } from './contexts/ConversationSetupContext';

function App() {
  const { theme } = useTheme();
  const user = useUser();

  return (
    <div className={"App theme-" + theme}>
      <div id="screen-darkener" className="screen-darkener"></div>
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
            <Route path='/search/:phrase' element={<SearchPage />} />
          </Routes>
        </span>
        <span className='right-bar side-bar'>
          <ConversationSetupProvider>
            <FriendList uri={`/api/get_friends/${user}`} />
          </ConversationSetupProvider>
        </span>
      </div>
    </div>
  );
}

export default App;