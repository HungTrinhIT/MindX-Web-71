import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);

  const publicNavs = (
    <>
      <li>
        <Link to='/signup' className='text-gray-500 hover:text-gray-600'>
          Sign up
        </Link>
      </li>
      <li>
        <Link to='/login' className='text-gray-500 hover:text-gray-600'>
          Log in
        </Link>
      </li>
    </>
  );

  const authenticatedNavs = (
    <>
      <li className='text-gray-500'>Hello {currentUser?.fullname}</li>
      <li>
        <p className='text-gray-500 hover:text-gray-600'>Logout</p>
      </li>
    </>
  );

  return (
    <header className='flex items-center justify-between px-4 py-6 bg-white'>
      <div className='flex items-center'>
        <Link to='/' className='text-2xl font-bold text-black'>
          Facebook
        </Link>
      </div>
      <nav>
        <ul className='flex items-center gap-4'>
          <li>
            <Link to='/' className='text-gray-500 hover:text-gray-600'>
              Home
            </Link>
          </li>
          {isAuthenticated ? authenticatedNavs : publicNavs}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
