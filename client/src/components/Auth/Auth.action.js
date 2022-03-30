import { createActions } from 'redux-actions';

import { ActionTypes } from './Auth.constant';

export const {
  login,
  register,
  saveLoginInfo,
  refreshToken,
} = createActions({
  [ActionTypes.LOGIN]: (payload) => payload,
  [ActionTypes.REGISTER]: (payload) => payload,
  [ActionTypes.SAVE_LOGIN_INFO]: (payload) => payload,
  [ActionTypes.REFRESH_TOKEN]: (payload) => payload,
});
