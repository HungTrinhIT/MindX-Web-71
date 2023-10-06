import { useState } from 'react';
import { useFormik } from 'formik';
import AuthAPI from '../../services/AuthAPI';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const initialValues = {
  email: '',
  password: '',
  fullname: '',
  address: '',
  gender: 'male',
};

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await AuthAPI.register(values);
        navigate('/login');
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleSubmit, handleChange } = formik;

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex justify-center items-center mt-[40px] md:mt-[100px]'>
      <div className='w-full max-w-md'>
        <form
          className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}>
          <h2 className='text-2xl text-center mb-6'>Register an account</h2>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 '
              htmlFor='fullname'>
              Fullname
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='fullname'
              name='fullname'
              type='text'
              placeholder='Enter your fullname'
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 '
              htmlFor='email'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              name='email'
              type='text'
              placeholder='Enter your email'
              onChange={handleChange}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 '
              htmlFor='password'>
              Address <span className='font-[400]'>(optional)</span>
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='add'
              name='address'
              type='text'
              placeholder='Enter your address'
              onChange={handleChange}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 '
              htmlFor='password'>
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Enter your password'
              onChange={handleChange}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 '
              htmlFor='gender'>
              Gender
            </label>
            <div className='flex flex-start gap-3'>
              <div className='flex items-center gap-1'>
                <input type='radio' name='gender' id='male' value='male' />
                <label htmlFor='male'>Male</label>
              </div>
              <div className='flex items-center gap-1'>
                <input type='radio' name='gender' id='female' value='female' />
                <label htmlFor='female'>Female</label>
              </div>
              <div className='flex items-center gap-1'>
                <input type='radio' name='gender' id='other' value='other' />
                <label htmlFor='other'>Other</label>
              </div>
            </div>
          </div>

          {error && <p className='text-red-500 text-xs mb-4'>{error}</p>}
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
              type='submit'>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        <p className='text-center text-gray-500 text-xs'>
          &copy; 2023 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
