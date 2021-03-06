import { useState } from 'react';

import * as Styled from './styled';
import LoginForm from '../Login/Login.container'
import RegisterForm from '../Register/Register.container'

import './index.css'

const Login = (props) => {
  const [popup, setPopup] = useState(false);
  const handleSwitchForm = () => {
    setPopup(!popup);
  }
  return (
    <Styled.Main>
      <RegisterForm {...{ popup, handleSwitchForm }} {...props} />
      <LoginForm {...{ popup, handleSwitchForm }} {...props} />
    </Styled.Main>
  )
}

export default Login
