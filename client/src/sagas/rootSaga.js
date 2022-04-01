import { all, fork } from 'redux-saga/effects';

import authSaga from '../components/Auth/Auth.saga';
import dashboardSaga from '../components/Dashboard/Dashboard.saga';

const rootSaga = function* () {
  yield all([
    fork(authSaga),
    fork(dashboardSaga),
  ]);
};

export default rootSaga;
