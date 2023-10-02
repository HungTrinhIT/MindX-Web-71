import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import SiteLayout from './components/layouts/SiteLayout/SiteLayout';

const App = () => {
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
