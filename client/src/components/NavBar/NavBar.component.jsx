import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './styled';

import logo from '../../assets/images/logo_nimble.png'

const NavBar = ({ username, toggle, handleToggle, handleLogout }) => {
  return (
    <Styled.NavBarContainer>
      <Styled.LogoContainer>
        <Styled.Logo src={logo} alt='logo' />
      </Styled.LogoContainer>
      <Styled.UserInfoContainer>
        <Styled.UserAvatar name={username} color={'#FF8200'} size="40" textSizeRatio={1.5} round={true} onClick={handleToggle} />
        <Styled.DropDownBar toggle={toggle}>
          <Styled.UserName>@{username}</Styled.UserName>
          <Styled.LogoutButton onClick={handleLogout}>
            Logout <FontAwesomeIcon icon={faRightFromBracket} fontSize={15} />
          </Styled.LogoutButton>
        </Styled.DropDownBar>
      </Styled.UserInfoContainer>
    </Styled.NavBarContainer>
  )
}

NavBar.propsType = {
  username: PropTypes.string.isRequired,
  toggle: PropTypes.bool,
  handleToggle: PropTypes.func,
  handleLogout: PropTypes.func,
}

export default React.memo(NavBar);
