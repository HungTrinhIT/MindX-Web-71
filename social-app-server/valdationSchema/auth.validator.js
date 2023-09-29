import * as yup from 'yup';

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  fullname: yup.string().required(),
  phoneNumber: yup.string().optional(),
  gender: yup.string().oneOf(['male', 'female', 'other']).required(),
  address: yup.string().required(),
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
