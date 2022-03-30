import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  login,
  refreshToken,
  register,
  saveLoginInfo
} from './Auth.action';
import { AuthApi } from '../../services/api/AuthAPI';

export function* loginSaga(action) {
  const { payload: { values, meta: { history } } } = action;
  const result = yield call([AuthApi, AuthApi.login], values);
  yield put(saveLoginInfo({ accessToken: result.accessToken }));
  history.push('/dashboard')
}

export function* registerSaga(action) {
  const { payload: { values, meta: { handleSwitchForm } } } = action;
  const result = yield call([AuthApi, AuthApi.register], values);
  if (result) {
    handleSwitchForm(true);
  }
}

export function* refreshTokenSaga() {
  yield call([AuthApi, AuthApi.refreshToken]);
}

export default function* authSaga() {
  yield all([
    takeLatest(login, loginSaga),
    takeLatest(register, registerSaga),
    takeLatest(refreshToken, refreshTokenSaga),
  ]);
}
