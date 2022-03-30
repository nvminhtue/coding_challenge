import { createActions } from 'redux-actions';

import { ActionTypes } from '../Auth/Auth.constant';

export const {
  register,
} = createActions({
  [ActionTypes.REGISTER]: (payload) => payload,
});
