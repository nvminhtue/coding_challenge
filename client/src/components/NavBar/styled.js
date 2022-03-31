import styled, { css } from 'styled-components';
import Avatar from 'react-avatar';

export const NavBarContainer = styled('div')`
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: #201547;
  border-bottom: 1px solid #e8e8e8;
`;

export const LogoContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`

export const Logo = styled('img')`
  height: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const LogoutButton = styled('div')`
  position: relative;
  color: #fff;
  transition: all 200ms linear;
  font-weight: 500;
  font-size: 15px;
  border-radius: 2px;
  padding: 5px 0;
  padding-left: 20px;
  padding-right: 15px;
  margin: 2px 0;
  text-align: left;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    color: #7597ff;
  }
`;

export const UserName = styled('div')`
  position: relative;
  color: #fff;
  transition: all 200ms linear;
  font-weight: 500;
  font-size: 15px;
  border-radius: 2px;
  padding: 5px 0;
  padding-left: 20px;
  padding-right: 15px;
  margin: 2px 0;
  text-align: left;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserAvatar = styled(Avatar)`
  margin: 0 5px;
  
  &:hover {
    cursor: pointer;
  }
`;

export const UserInfoContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const DropDownBar = styled('div')`
  position: absolute;
  padding: 5px;
  background-color: #111;
  top: 70px;
  right: 0;
  width: 100px;
  border-radius: 4px;
  display: block;
  box-shadow: 0 14px 35px 0 rgba(9,9,12,0.4);
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: all 200ms linear;

  ${props => props.toggle && css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `}
`;
