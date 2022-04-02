import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  fetchSearch,
  saveSearchInfo,
  uploadCsv,
} from './Dashboard.action';
import { DashboardAPI } from '../../services/api/DashboardAPI';

export function* uploadCsvSaga(action) {
  const { payload } = action;
  yield call([DashboardAPI, DashboardAPI.uploadCSV], payload);
}

export function* fetchSearchSaga(action) {
  const { payload } = action;
  const result = yield call([DashboardAPI, DashboardAPI.fetchSearch], { pagyInfo: payload });
  if (result) {
    yield put(saveSearchInfo({
      searchItems: result.items,
      pagyInfo: result.pagyInfo
    }))
  }
}

export default function* dashboardSaga() {
  yield all([
    takeLatest(uploadCsv, uploadCsvSaga),
    takeLatest(fetchSearch, fetchSearchSaga),
  ]);
}
