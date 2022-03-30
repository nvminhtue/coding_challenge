import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from '../Auth/styled';

const LoginForm = ({
  handleSubmit,
  popup,
  handleSwitchForm,
  errors,
  touched,
}) => {
  return (
    <Styled.SignIn active={popup}>
      <Styled.SignInLabel onClick={handleSwitchForm}>Login</Styled.SignInLabel>
      <Styled.AuthInput
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <Styled.AuthInput
        type="password"
        name="password"
        required
        placeholder="******"
      />
      {(errors.email && touched.email) && (<Styled.ErrorMessage>{errors.email}</Styled.ErrorMessage>)}
      {(errors.password && touched.password) && (<Styled.ErrorMessage>{errors.password}</Styled.ErrorMessage>)}
      <Styled.Button onClick={handleSubmit}>Login</Styled.Button>
    </Styled.SignIn>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  popup: PropTypes.bool.isRequired,
  handleSwitchForm: PropTypes.func.isRequired,
  error: PropTypes.object,
  touched: PropTypes.object,
};

export default React.memo(LoginForm);
