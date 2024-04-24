import Homepage from './pages/homepage';
import LoginPage from './pages/login';
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
        </Routes>
      </div>
    </>
  );
}

export default App;