import { searchInfoSelector } from '../Dashboard.selector';

const originalState = {
  dashboardReducer: {
    searchItems: [{}],
    pagyInfo: {
      count: 0,
      page: 0,
      pageCount: 0,
      total: 0,
    }
  },
};

describe('Auth Selector', () => {
  it('should get auth status', () => {
    expect(searchInfoSelector(originalState)).toMatchObject({
      searchItems: [{}],
      pagyInfo: {
        count: 0,
        page: 0,
        pageCount: 0,
        total: 0,
      }
    });
  });
});
