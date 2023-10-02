import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
