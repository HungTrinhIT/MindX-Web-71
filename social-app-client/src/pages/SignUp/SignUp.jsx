import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';
import AuthAPI from '../../services/AuthAPI';
import Button from '../../components/Button/Button';
import { useFormik } from 'formik';
import CustomErrorMessage from '../../components/CustomErrorMessage/CustomErrorMessage';

import * as yup from 'yup';
const SignUpValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      'Password must contain at least one number and one special character'
    )
    .min(8, 'Password must be at least 8 characters long'),
  fullname: yup.string().required(),
  phoneNumber: yup.string().optional(),
  gender: yup.string().oneOf(['male', 'female', 'other']).required(),
  address: yup.string().optional(),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      address: '',
      fullname: '',
      gender: 'male',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        await AuthAPI.signUp(values);
        navigate('/login');
      } catch (error) {
        setError(error.response.data?.message);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: SignUpValidationSchema,
  });

  const { handleSubmit, handleChange, errors } = formik;

  return (
    <div className='flex justify-center items-center mt-10 md:mt-[100px]'>
      <div className='w-full md:max-w-md'>
        <form
          className='bg-white shadow-lg rounded p-8'
          onSubmit={handleSubmit}>
          <h2 className='text-2xl text-center mb-6 text-black'>
            Register account
          </h2>
          {error && <p className='text-red-500 my-4'>{error}</p>}
          <div className='flex flex-col gap-4'>
            <FieldTextInput
              label='Fullname'
              id='fullname'
              name='fullname'
              handleChange={handleChange}
            />
            {errors.fullname && (
              <CustomErrorMessage content={errors.fullname} />
            )}
            <FieldTextInput
              label='Email'
              id='email'
              name='email'
              handleChange={handleChange}
            />
            {errors.email && <CustomErrorMessage content={errors.email} />}

            <FieldTextInput
              label='Address (optional)'
              id='address'
              name='address'
              handleChange={handleChange}
            />
            {errors.address && <CustomErrorMessage content={errors.address} />}
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

export default SignUp;
