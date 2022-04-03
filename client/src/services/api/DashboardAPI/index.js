import { stringify } from 'qs';

import RestService from '../RestService'

export class DashboardService extends RestService {

  uploadCSV(data) {
    return this.post({ url: '/search-list/uploadCSV', data }, { enableFlashMessageOnSuccess: true });
  }

  fetchSearch(data) {
    return this.get({ url: `/search-list?${stringify(data)}`,  }, { enableFlashMessageOnError: true });
  }
}

export const DashboardAPI = new DashboardService();
