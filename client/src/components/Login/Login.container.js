import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import LoginFormComponent from './Login.component';
import loginValidation from './Login.validation';
import { login as loginAction } from '../Auth/Auth.action';

const LoginForm = (props) => {
  return (
    <LoginFormComponent
      {...props}
    />
  );
};

export default compose(
  connect(null, { login: loginAction }),
  withFormik({
    enableReinitialize: true,
    validationSchema: loginValidation,
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),
    handleSubmit: (values, { props: { login, history } }) => {
      login({ values, meta: { history } });
    },
  }),
)(LoginForm);
