import React from 'react';

const Button = ({
  children,
  isLoading = false,
  type = 'button',
  ...restProps
}) => {
  return (
    <button
      type={type}
      className='bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      {...restProps}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
