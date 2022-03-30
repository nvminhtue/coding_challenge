import * as Yup from 'yup';

import { AuthConstant } from '../Auth/Auth.constant';

const RegisterValidation = () => Yup.object().shape({
  email: Yup.string()
    .required('Email is a required field')
    .matches(AuthConstant.EMAIL_REGEX, 'Email should matched regex'),
  name: Yup.string()
    .required('Name is a required field'),
  username: Yup.string()
    .required('Username is a required field'),
  password: Yup.string()
    .required('Password is a required field'),
  confirmPassword: Yup.string()
    .required('Confirm password is a required field')
    .equalTo(Yup.ref('password'), 'Confirm password should match password field'),
});

export default RegisterValidation;

function equalTo(ref, msg) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: msg,
    test(value) {
      return value === this.resolve(ref);
    },
  });
}

Yup.addMethod(Yup.mixed, 'equalTo', equalTo);
