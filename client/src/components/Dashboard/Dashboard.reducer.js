import { handleActions } from 'redux-actions';

import { saveSearchInfo } from './Dashboard.action';

export const initialState = {
  searchItems: [{}],
  pagyInfo: {
    count: 0,
    page: 0,
    pageCount: 0,
    total: 0,
  }
};

export default handleActions({
  [saveSearchInfo]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, initialState);
