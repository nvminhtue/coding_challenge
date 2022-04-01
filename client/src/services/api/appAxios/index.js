import axios from 'axios';
import { toast } from 'react-toastify';

import { getToken } from '../utils/helpers';
import { ROUTES } from '../../../resources/utils/constants';
import history from '../../../services/history';
import isUndefinedOrNull from '../../../utils/helpers/isUndefinedOrNull';

import { ERROR_CODES } from './constants';

const axiosConfig = {
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  timeout: 120000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const appAxios = axios.create(axiosConfig);

appAxios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    // config some headers if needed
    return config;
  },
  error => Promise.reject(error),
);

appAxios.interceptors.response.use(
  response => response,
  error => {
    if (!error.response?.status) {
      toast.error('An unexpected error has occurred. Please try again later.', { autoClose: 5000 });
      return Promise.reject();
    }

    const { statusCode } = error.response.data?.errors ?? {};

    switch (statusCode.toString() || error.response.status?.toString()) {
      case ERROR_CODES.INTERNAL_SERVER_ERROR:
        history.push(ROUTES.INTERNAL_SERVER_ERROR);
        break;

      case ERROR_CODES.MODEL_NOT_FOUND:
        history.replace(ROUTES.ROOT);
        break;

      case ERROR_CODES.UNAUTHORIZED:
        window.location.replace(ROUTES.ROOT);
        break;

      case ERROR_CODES.FORBIDDEN:
        window.location.replace(ROUTES.ROOT);
        break;

      default:
        break;
    }

    return Promise.reject(error);
  },
);

function setAppAxiosHeader(key, value) {
  if (isUndefinedOrNull(key)) return;

  if (isUndefinedOrNull(value)) {
    delete appAxios.defaults.headers.common[key];
    return;
  }

  appAxios.defaults.headers.common[key] = value;
}

export { axiosConfig, setAppAxiosHeader };

export default appAxios;
