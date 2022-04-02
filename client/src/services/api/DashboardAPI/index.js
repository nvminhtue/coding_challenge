import RestService from '../RestService'

export class DashboardService extends RestService {

  uploadCSV(data) {
    return this.post({ url: '/search-list/uploadCSV', data }, { enableFlashMessageOnSuccess: true });
  }

  fetchSearch(data) {
    return this.get({ url: '/search-list', data }, { enableFlashMessageOnError: true });
  }
}

export const DashboardAPI = new DashboardService();
