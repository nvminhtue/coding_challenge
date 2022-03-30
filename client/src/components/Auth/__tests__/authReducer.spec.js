import { saveLoginInfo } from '../Auth.action';
import authReducer, { initialState } from '../Auth.reducer';

describe('Auth Reducers', () => {
  const payload = { accessToken: 'accessToken' };

  it('should save login info', () => {
    expect(authReducer(initialState, saveLoginInfo(payload))).toMatchObject(payload);
  });
});
