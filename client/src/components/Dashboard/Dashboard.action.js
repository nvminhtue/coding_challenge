import { createActions } from 'redux-actions';

import { ActionTypes } from './Dashboard.constant';

export const {
  uploadCsv,
} = createActions({
  [ActionTypes.UPLOAD_CSV]: (payload) => payload,
});
