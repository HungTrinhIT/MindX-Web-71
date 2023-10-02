import * as yup from 'yup';

const registerSchema = yup.object().shape({
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

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const AuthValidator = {
  registerSchema,
  loginSchema,
};

export default AuthValidator;
