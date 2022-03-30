import keyMirror from 'fbjs/lib/keyMirror';

export const ActionTypes = keyMirror({
  REGISTER: undefined,
  LOGIN: undefined,
  SAVE_LOGIN_INFO: undefined,
});

export const AuthConstant = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
