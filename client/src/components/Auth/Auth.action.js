import { createActions } from 'redux-actions';

import { ActionTypes } from './Auth.constant';

export const {
  login,
  logout,
  register,
  saveLoginInfo,
  refreshToken,
} = createActions({
  [ActionTypes.LOGIN]: (payload) => payload,
  [ActionTypes.LOGOUT]: (payload) => payload,
  [ActionTypes.REGISTER]: (payload) => payload,
  [ActionTypes.SAVE_LOGIN_INFO]: (payload) => payload,
  [ActionTypes.REFRESH_TOKEN]: (payload) => payload,
});
