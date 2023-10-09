import React, { useState } from 'react';
import * as yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { TOKEN_TYPES } from '../../utils/constants';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';
import AuthAPI from '../../services/AuthAPI';
import Button from '../../components/Button/Button';
import CustomErrorMessage from '../../components/CustomErrorMessage/CustomErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authSlice';

const LoginValidationSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      'Password must contain at least one number and one special character'
    )
    .min(8, 'Password must be at least 8 characters long'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        const response = await AuthAPI.login(values);
        const accessToken = response.data.accessToken;

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          const currenUserResponse = await AuthAPI.fetchCurrentUser();
          const currentUserData = currenUserResponse.data;

          const payload = {
            user: currentUserData,
          };

          dispatch(login(payload));
          navigate('/');
        }
      } catch (error) {
        setError(error.response.data?.message);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: LoginValidationSchema,
  });

  const { handleSubmit, handleChange, errors } = formik;

  const currentRoute = window.location.pathname;
  console.log('🚀 ~ file: Login.jsx:67 ~ Login ~ currentRoute:', currentRoute);
  if (isAuthenticated) {
    return <Navigate to={currentRoute} />;
  }

  return (
    <div className='flex justify-center items-center mt-10 md:mt-[100px]'>
      <div className='w-full md:max-w-md'>
        <form
          className='bg-white shadow-lg rounded p-8'
          onSubmit={handleSubmit}>
          <h2 className='text-2xl text-center mb-6 text-black'>Login</h2>
          {error && <p className='text-red-500 my-4'>{error}</p>}
          <div className='flex flex-col gap-4'>
            <FieldTextInput
              label='Email'
              id='email'
              name='email'
              handleChange={handleChange}
            />
            {errors.email && <CustomErrorMessage content={errors.email} />}
            <FieldTextInput
              label='Password'
              id='password'
              name='password'
              type='password'
              handleChange={handleChange}
            />
            {errors.password && (
              <CustomErrorMessage content={errors.password} />
            )}

            <Button type='submit' isLoading={loading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
