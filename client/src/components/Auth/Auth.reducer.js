import { handleActions } from 'redux-actions';

import { saveLoginInfo } from './Auth.action';

export const initialState = {
  accessToken: ''
};

export default handleActions({
  [saveLoginInfo]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, initialState);
