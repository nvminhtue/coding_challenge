import { login, logout, refreshToken, register, saveLoginInfo } from '../Auth.action';
import { ActionTypes } from '../Auth.constant';

describe('Auth Actions', () => {
  it('should create login action', () => {
    const values = {
      email: 'email@gmail.com',
      password: 'password'
    }

    const actionReturnValue = login({ values });

    expect(actionReturnValue.type).toEqual(ActionTypes.LOGIN);
    expect(actionReturnValue.payload.values).toEqual(values);
  });

  it('should create saveLoginInfo action', () => {
    const payload = {
      accessToken: 'accessToken'
    };
    const actionReturnValue = saveLoginInfo(payload);

    expect(actionReturnValue.type).toEqual(ActionTypes.SAVE_LOGIN_INFO);
    expect(actionReturnValue.payload).toEqual(payload);
  });

  it('should create register action', () => {
    const values = {
      name: 'name',
      username: 'username',
      email: 'email',
      password: 'password',
      confirmPassword: 'confirmPassword'
    };
    const actionReturnValue = register({ values });

    expect(actionReturnValue.type).toEqual(ActionTypes.REGISTER);
    expect(actionReturnValue.payload.values).toEqual(values);
  });

  it('should create refreshToken action', () => {
    const actionReturnValue = refreshToken();

    expect(actionReturnValue.type).toEqual(ActionTypes.REFRESH_TOKEN);
    expect(actionReturnValue.payload).toEqual();
  });

  it('should create logout action', () => {
    const actionReturnValue = logout();

    expect(actionReturnValue.type).toEqual(ActionTypes.LOGOUT);
    expect(actionReturnValue.payload).toEqual();
  });
});
