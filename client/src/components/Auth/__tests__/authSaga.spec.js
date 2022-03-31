import { cloneableGenerator } from '@redux-saga/testing-utils';
import { all, call, takeLatest } from 'redux-saga/effects';
import { AuthApi } from '../../../services/api/AuthAPI';

import { login, logout, refreshToken, register } from '../Auth.action';
import authSaga, { loginSaga, refreshTokenSaga, registerSaga, logoutSaga } from '../Auth.saga';

describe('login saga', () => {
  const values = {
    email: 'email@gmail.com',
    password: 'password'
  };
  const history = function() {};
  history.push = jest.fn();
  const param = { values, meta: { history } }

  const action = login(param);
  const generator = cloneableGenerator(loginSaga)(action);

  it('should call login api', () => {
    const result = generator.next().value;
    const expected = call([AuthApi, AuthApi.login], param);

    expect(result.payload.fn).toEqual(expected.payload.fn);
    expect(result.payload.args[0]).toMatchObject(values);
  });

  it('should trigger history successfully', async () => {
    const response = '/dashboard'
    const _result = generator.next(response).value;

    expect(history.push).toHaveBeenCalled();
  });
});

describe('register saga', () => {
  const values = {
    name: 'name',
    username: 'username',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword'
  };
  const handleSwitchForm = jest.fn();
  const param = { values, meta: { handleSwitchForm } }

  const action = register(param);
  const generator = cloneableGenerator(registerSaga)(action);

  it('should call register api', () => {
    const result = generator.next().value;
    const expected = call([AuthApi, AuthApi.register], values);

    expect(result.payload.fn).toEqual(expected.payload.fn);
    expect(result.payload.args[0]).toMatchObject(values);
  });

  it('should trigger handleSwitchForm', () => {
    const _result = generator.next(true).value;

    expect(handleSwitchForm).toHaveBeenCalled();
  });
});

describe('refresh token saga', () => {
  const action = refreshToken();
  const generator = cloneableGenerator(refreshTokenSaga)(action);

  it('should call delete sample api', () => {
    const result = generator.next().value;
    const expected = call([AuthApi, AuthApi.refreshToken]);

    expect(result.payload.fn).toEqual(expected.payload.fn);
    expect(result.payload.args[0]).toBeUndefined();
  });
});

describe('logout saga', () => {
  const history = function () { };
  history.push = jest.fn();
  const param = { meta: { history } }

  const action = logout(param);
  const generator = cloneableGenerator(logoutSaga)(action);

  it('should call logout api', () => {
    const result = generator.next().value;
    const expected = call([AuthApi, AuthApi.logout]);

    expect(result.payload.fn).toEqual(expected.payload.fn);
    expect(result.payload.args[0]).toBeUndefined();
  });

  it('should save user info to clear store after called api successfully', async () => {
    const response = {
      userId: '',
      username: '',
    };
    const result = generator.next(response).value;

    expect(result.payload.action.payload).toMatchObject(response);
  });

  it('should trigger history successfully', async () => {
    const response = '/'
    const _result = generator.next(response).value;

    expect(history.push).toHaveBeenCalled();
  });
});

describe('calls `all()` with the correct functions', () => {
  const sagaAll = authSaga();
  const effects = sagaAll.next().value;

  it('should take all effects', () => {
    expect(effects).toEqual(all([
      takeLatest(login, loginSaga),
      takeLatest(register, registerSaga),
      takeLatest(refreshToken, refreshTokenSaga),
      takeLatest(logout, logoutSaga),
    ]));
  });
});
