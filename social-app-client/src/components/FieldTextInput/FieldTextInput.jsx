import React from 'react';

const FieldTextInput = ({
  className,
  label,
  id,
  handleChange,
  ...restProps
}) => {
  const inputProps = {
    id,
    onChange: handleChange,
    ...restProps,
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className='block text-gray-700 text-sm font-bold mb-2'>
        {label}
      </label>
      <input
        {...inputProps}
        className='shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
    </div>
  );
};

export default FieldTextInput;
