import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import RegisterFormComponent from './Register.component';
import registerValidation from './Register.validation';
import { register as registerAction } from '../Auth/Auth.action';

const RegisterForm = (props) => {
  return (
    <RegisterFormComponent
      {...props}
    />
  );
};

export default compose(
  connect(null, { register: registerAction }),
  withFormik({
    enableReinitialize: true,
    validationSchema: registerValidation,
    mapPropsToValues: () => ({
      email: '',
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    }),
    handleSubmit: (values, { props: { register, handleSwitchForm } }) => {
      register({ values, meta: { handleSwitchForm } });
    },
  }),
)(RegisterForm);
