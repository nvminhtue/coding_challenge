import keyMirror from 'fbjs/lib/keyMirror';

export const ActionTypes = keyMirror({
  REGISTER: undefined,
  LOGIN: undefined,
  LOGOUT: undefined,
  SAVE_LOGIN_INFO: undefined,
  REFRESH_TOKEN: undefined,
});

export const AuthConstant = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
