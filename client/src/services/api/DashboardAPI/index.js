import RestService from '../RestService'

export class DashboardService extends RestService {

  uploadCSV(data) {
    return this.post({ url: '/uploadCSV', data }, { enableFlashMessageOnSuccess: true });
  }
}

export const DashboardAPI = new DashboardService();
