import styled, { css } from 'styled-components';

import Input from '../common/Input';

export const Main = styled('div')`
  width: 350px;
  height: 700px;
  background: red;
  overflow: hidden;
  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
`;

export const Register = styled('div')`
  position: relative;
  width:100%;
  height: 100%;
`;

export const RegisterLabel = styled('div')`
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: .5s ease-in-out;
  ${props => !!props.active && css`
    transform: scale(.6);
  `}
`;

export const AuthInput = styled(Input)`
  width: 60%;
	height: 20px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
`;

export const Button = styled('button')`
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #573b8a;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
  &:hover {
    background: #6d44b8;
  }
`;

export const SignIn = styled('div')`
	height: 660px;
	background: #eee;
	border-radius: 60% / 10%;
  transform: translateY(-180px);
	transition: .8s ease-in-out;
  ${props => !!props.active && css`
    transform: translateY(-700px);
  `}
`;

export const SignInLabel = styled(RegisterLabel)`
	color: #573b8a;
	transform: scale(.6);
`;

export const ErrorMessage = styled('div')`
  font-size: 12px;
  color: red;
	padding-left: 60px;
`;
