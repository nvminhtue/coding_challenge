import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  login,
  logout,
  refreshToken,
  register,
  saveLoginInfo,
} from './Auth.action';
import { AuthApi } from '../../services/api/AuthAPI';

export function* loginSaga(action) {
  const { payload: { values, meta: { history } } } = action;
  const result = yield call([AuthApi, AuthApi.login], values);
  if (result) history.push('/dashboard')
}

export function* registerSaga(action) {
  const { payload: { values, meta: { handleSwitchForm } } } = action;
  const result = yield call([AuthApi, AuthApi.register], values);
  if (result) {
    handleSwitchForm(true);
  }
}

export function* logoutSaga(action) {
  const { payload: { meta: { history } } } = action;
  yield call([AuthApi, AuthApi.logout]);
  yield put(saveLoginInfo({
    userId: '',
    username: '',
  }));
  history.push('/');
}

export function* refreshTokenSaga() {
  yield call([AuthApi, AuthApi.refreshToken]);
}

export default function* authSaga() {
  yield all([
    takeLatest(login, loginSaga),
    takeLatest(register, registerSaga),
    takeLatest(refreshToken, refreshTokenSaga),
    takeLatest(logout, logoutSaga),
  ]);
}
