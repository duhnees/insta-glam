import Homepage from './pages/homepage';
import LoginPage from './pages/login';
import OutfitPage from './pages/outfitPage';
import PostPage from './pages/postPage';
import ProfilePage from './pages/profilePage';
import SignupPage from './pages/signup';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/outfit/:postId?" element={<OutfitPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;