import { userInfoSelector } from '../Auth.selector';

const originalState = {
  authReducer: {
    userId: 'userId',
    username: 'username'
  },
};

describe('Auth Selector', () => {
  it('should get auth status', () => {
    expect(userInfoSelector(originalState)).toMatchObject({
      userId: 'userId',
      username: 'username'
    });
  });
});
