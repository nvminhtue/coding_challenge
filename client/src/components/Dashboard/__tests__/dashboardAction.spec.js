import { fetchSearch, saveSearchInfo, uploadCsv } from '../Dashboard.action';
import { ActionTypes } from '../Dashboard.constant';

describe('Auth Actions', () => {
  it('should create upload csv action', () => {

    const dataArray = new FormData();
    const actionReturnValue = uploadCsv(dataArray);

    expect(actionReturnValue.type).toEqual(ActionTypes.UPLOAD_CSV);
    expect(actionReturnValue.payload).toEqual(dataArray);
  });

  it('should create fetch search action', () => {
    const payload = {
      page: 1,
      count: 10,
    }

    const actionReturnValue = fetchSearch(payload);

    expect(actionReturnValue.type).toEqual(ActionTypes.FETCH_SEARCH);
    expect(actionReturnValue.payload).toEqual(payload);
  });

  it('should create save search info action', () => {
    const payload = {
      searchItems: [{}],
      pagyInfo: {
        count: 0,
        page: 0,
        pageCount: 0,
        total: 0,
      }
    }

    const actionReturnValue = saveSearchInfo(payload);

    expect(actionReturnValue.type).toEqual(ActionTypes.SAVE_SEARCH_INFO);
    expect(actionReturnValue.payload).toEqual(payload);
  });
});
