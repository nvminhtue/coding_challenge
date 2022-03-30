import { createActions } from 'redux-actions';

import { ActionTypes } from './Auth.constant';

export const {
  login,
  register,
  saveLoginInfo,
} = createActions({
  [ActionTypes.LOGIN]: (payload) => payload,
  [ActionTypes.REGISTER]: (payload) => payload,
  [ActionTypes.SAVE_LOGIN_INFO]: (payload) => payload,
});
