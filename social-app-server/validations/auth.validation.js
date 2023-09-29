import * as Yup from 'yup';

const AuthValidator = {
  login: Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().min(6),
  }),
  register: Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().min(6).required(),
    fullname: Yup.string().required(),
    gender: Yup.string().oneOf(['male', 'female']).required(),
  }),
};

export default AuthValidator;
