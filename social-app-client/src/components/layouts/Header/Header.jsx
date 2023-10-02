import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/auth/authSlice';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const authenticatedNavs = (
    <>
      <li>
        <Link to='/' className='text-gray-500 hover:text-gray-600'>
          Homepage
        </Link>
      </li>
      <li>
        <button onClick={onLogOutHandler}>Log out</button>
      </li>
    </>
  );

  const publicNavs = (
    <>
      <li>
        <Link to='/signup' className='text-gray-500 hover:text-gray-600'>
          Sign Up
        </Link>
      </li>
      <li>
        <Link to='/login' className='text-gray-500 hover:text-gray-600'>
          Log In
        </Link>
      </li>
    </>
  );

  return (
    <header className='flex items-center justify-between px-4 py-6 bg-white '>
      <div className='flex items-center'>
        <Link to='/' className='text-2xl font-bold'>
          Logo
        </Link>
      </div>
      <nav>
        <ul className='flex items-center gap-4'>
          {isAuthenticated ? authenticatedNavs : publicNavs}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
