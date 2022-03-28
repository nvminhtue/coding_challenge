import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import get from 'lodash/get';
import qs from 'qs';
import { toast } from 'react-toastify';

import appAxios from '../appAxios';
import responseErrorFormatter from '../utils/responseErrorFormatter';

class RestService {
  axios: typeof appAxios;
  options: any;
  constructor(instance = appAxios) {
    this.axios = instance;
  }

  get(request: AxiosRequestConfig, options = {}) {
    this.options = options;
    return this.execute({
      method: 'get',
      paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'indices' }),
      ...request,
    });
  }

  post(request: AxiosRequestConfig, options = {}) {
    this.options = {
      enableFlashMessageOnSuccess: false,
      enableFlashMessageOnError: true,
      ...options,
    };
    return this.execute({ method: 'post', ...request });
  }

  put(request: AxiosRequestConfig, options = {}) {
    this.options = {
      enableFlashMessageOnSuccess: false,
      enableFlashMessageOnError: true,
      ...options,
    };
    return this.execute({ method: 'put', ...request });
  }

  patch(request: AxiosRequestConfig) {
    return this.execute({ method: 'patch', ...request });
  }

  delete(request: AxiosRequestConfig, options = {}) {
    this.options = {
      enableFlashMessageOnSuccess: true,
      enableFlashMessageOnError: true,
      ...options,
    };
    return this.execute({ method: 'delete', ...request });
  }

  async execute(request: AxiosRequestConfig) {
    try {
      const response = await this.axios(request);
      return this.successHandler(response);
    } catch (error) {
      return this.failureHandler(error as AxiosError);
    }
  }

  successHandler(response: AxiosResponse) {
    if (this.options?.enableFlashMessageOnSuccess) {
      const message = response.data?.message ?? response.data?.data?.message;

      if (message) toast.success(message, { autoClose: 3000 });
    }

    return response.data ?? {};
  }

  failureHandler(error: AxiosError) {
    const formattedError = responseErrorFormatter({
      data: get(error, 'response.data'),
      status: get(error, 'response.status'),
    });

    if (this.options?.enableFlashMessageOnError) {
      const message = formattedError.errorDescription;

      if (message) toast.error(message, { autoClose: 5000 });
    }

    return Promise.reject(formattedError);
  }
}

export default RestService;
