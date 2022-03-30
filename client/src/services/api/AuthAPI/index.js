import RestService from '../RestService'

export class AuthService extends RestService {
  login(data) {
    return this.post({ url: '/login', data });
  }

  register(data) {
    return this.post({ url: '/register', data }, { enableFlashMessageOnSuccess: true });
  }
}

export const AuthApi = new AuthService();
