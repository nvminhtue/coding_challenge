import { handleActions } from 'redux-actions';

import { saveLoginInfo } from './Auth.action';

export const initialState = {
  userId: '',
  username: '',
};

export default handleActions({
  [saveLoginInfo]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, initialState);
