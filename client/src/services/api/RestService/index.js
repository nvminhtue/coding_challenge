import get from 'lodash/get';
import qs from 'qs';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';

import appAxios from '../appAxios';
import responseErrorFormatter from '../utils/responseErrorFormatter';

class RestService {
  axios;
  options;
  constructor(instance = appAxios) {
    this.axios = instance;
  }

  get(request, options = {}) {
    this.options = options;
    return this.execute({
      method: 'get',
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices' }),
      ...request,
    });
  }

  post(request, options = {}) {
    this.options = {
      enableFlashMessageOnSuccess: false,
      enableFlashMessageOnError: true,
      ...options,
    };
    return this.execute({ method: 'post', ...request });
  }

  put(request, options = {}) {
    this.options = {
      enableFlashMessageOnSuccess: false,
      enableFlashMessageOnError: true,
      ...options,
    };
    return this.execute({ method: 'put', ...request });
  }

  patch(request) {
    return this.execute({ method: 'patch', ...request });
  }

  delete(request, options = {}) {
    this.options = {
      enableFlashMessageOnSuccess: true,
      enableFlashMessageOnError: true,
      ...options,
    };
    return this.execute({ method: 'delete', ...request });
  }

  async execute(request) {
    try {
      const response = await trackPromise(this.axios(request));
      return this.successHandler(response);
    } catch (error) {
      return this.failureHandler(error);
    }
  }

  successHandler(response) {
    if (this.options?.enableFlashMessageOnSuccess) {
      const message = response.data?.message ?? response.data?.data?.message;

      if (message) toast.success(message, { autoClose: 3000 });
    }

    return response.data ?? {};
  }

  failureHandler(error) {
    const formattedError = responseErrorFormatter({
      data: get(error, 'response.data'),
      status: get(error, 'response.status'),
    });

    if (this.options?.enableFlashMessageOnError) {
      const message = formattedError.errorMessage;

      if (message) toast.error(message, { autoClose: 5000 });
    }
  }
}

export default RestService;
