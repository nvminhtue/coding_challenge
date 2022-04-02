import { saveSearchInfo } from '../Dashboard.action';
import dashboardReducer, { initialState } from '../Dashboard.reducer';

describe('Dashboard Reducers', () => {
  const payload = {
    searchItems: [{}],
    pagyInfo: {
      count: 0,
      page: 0,
      pageCount: 0,
      total: 0,
    }
  };

  it('should save search info', () => {
    expect(dashboardReducer(initialState, saveSearchInfo(payload))).toMatchObject(payload);
  });
});
