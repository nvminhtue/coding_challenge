import * as Yup from 'yup';

import { AuthConstant } from '../Auth/Auth.constant';

export default Yup.object().shape({
  email: Yup.string()
    .required('Email is a required field')
    .matches(AuthConstant.EMAIL_REGEX, 'Email should matched regex'),
  password: Yup.string()
    .required('Password is a required field'),
});
