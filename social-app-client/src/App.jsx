import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import SiteLayout from './components/layouts/SiteLayout/SiteLayout';
import SignUpPage from './pages/SignUp/SignUpPage';
import LoginPage from './pages/Login/LoginPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './redux/auth/authAction';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SiteLayout />}>
          <Route index element={<ProtectedRoute component={HomePage} />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='login' element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
