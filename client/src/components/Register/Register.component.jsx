import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from '../Auth/styled';

const RegisterForm = ({
  handleSubmit,
  handleSwitchForm,
  errors,
  touched,
  popup,
}) => {
  return (
    <Styled.Register>
      <Styled.RegisterLabel active={popup} onClick={handleSwitchForm}>Register</Styled.RegisterLabel>
        <Styled.AuthInput type="text" name="username" placeholder="User name" required />
        <Styled.AuthInput type="text" name="name" placeholder="Name" required />
        <Styled.AuthInput type="email" name="email" placeholder="Email" required />
        <Styled.AuthInput type="password" name="password" placeholder="******" required />
        <Styled.AuthInput type="password" name="confirmPassword" placeholder="******" required />
      <Styled.Button onClick={handleSubmit}>Register</Styled.Button>
      {(errors.username && touched.username) && (<Styled.ErrorMessage>{errors.username}</Styled.ErrorMessage>)}
      {(errors.name && touched.name) && (<Styled.ErrorMessage>{errors.name}</Styled.ErrorMessage>)}
      {(errors.email && touched.email) && (<Styled.ErrorMessage>{errors.email}</Styled.ErrorMessage>)}
      {(errors.password && touched.password) && (<Styled.ErrorMessage>{errors.password}</Styled.ErrorMessage>)}
      {(errors.confirmPassword && touched.confirmPassword) && (<Styled.ErrorMessage>{errors.confirmPassword}</Styled.ErrorMessage>)}
    </Styled.Register>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleSwitchForm: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
};

export default React.memo(RegisterForm);
