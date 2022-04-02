import { createActions } from 'redux-actions';

import { ActionTypes } from './Dashboard.constant';

export const {
  uploadCsv,
  fetchSearch,
  saveSearchInfo,
} = createActions({
  [ActionTypes.UPLOAD_CSV]: (payload) => payload,
  [ActionTypes.FETCH_SEARCH]: (payload) => payload,
  [ActionTypes.SAVE_SEARCH_INFO]: (payload) => payload,
});
