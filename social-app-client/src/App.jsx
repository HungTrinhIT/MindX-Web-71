import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import SiteLayout from './components/layouts/SiteLayout/SiteLayout';
import { useEffect } from 'react';
import AuthAPI from './services/AuthAPI';
import { useDispatch } from 'react-redux';
import { login } from './redux/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();

  const fetchCurrenUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const currenUser = await AuthAPI.fetchCurrentUser();
        const payload = {
          user: currenUser.data,
        };

        dispatch(login(payload));
      } catch (error) {
        console.log('fetch-current-user-failed:', error);
      }
    }
  };

  useEffect(() => {
    fetchCurrenUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
