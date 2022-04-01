import {
  all,
  call,
  takeLatest,
} from 'redux-saga/effects';

import {
  uploadCsv,
} from './Dashboard.action';
import { DashboardAPI } from '../../services/api/DashboardAPI';

export function* uploadCsvSaga(action) {
  const { payload } = action;
  yield call([DashboardAPI, DashboardAPI.uploadCSV], payload);
}

export default function* dashboardSaga() {
  yield all([
    takeLatest(uploadCsv, uploadCsvSaga),
  ]);
}
