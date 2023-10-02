import React from 'react';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';
import Button from '../../components/Button/Button';

const Login = () => {
  return (
    <div className='flex justify-center items-center mt-10 md:mt-[100px]'>
      <div className='w-full md:max-w-md'>
        <form className='bg-white shadow-lg rounded p-8'>
          <h2 className='text-2xl text-center mb-6 text-black'>
            Login
          </h2>
          <div className='flex flex-col gap-4'>
            <FieldTextInput label='Email' id='email' name='email' />
            <FieldTextInput
              label='Password'
              id='password'
              name='password'
              type='password'
            />
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
