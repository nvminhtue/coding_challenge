import { all } from 'redux-saga/effects';

const rootSaga = function* () {
  yield all([
    // fork(newSaga),
  ]);
};

export default rootSaga;
