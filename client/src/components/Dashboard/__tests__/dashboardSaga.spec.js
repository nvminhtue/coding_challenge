import { cloneableGenerator } from '@redux-saga/testing-utils';
import { all, call, takeLatest } from 'redux-saga/effects';

import { fetchSearch, uploadCsv } from '../Dashboard.action';
import dashboardSaga, { fetchSearchSaga, uploadCsvSaga } from '../Dashboard.saga';
import { DashboardAPI } from '../../../services/api/DashboardAPI';

describe('dashboard saga', () => {
  const dataArray = new FormData();

  const action = uploadCsv(dataArray);
  const generator = cloneableGenerator(uploadCsvSaga)(action);

  it('should call upload api', () => {
    const result = generator.next().value;
    const expected = call([DashboardAPI, DashboardAPI.uploadCSV], dataArray);

    expect(result.payload.fn).toEqual(expected.payload.fn);
    expect(result.payload.args[0]).toMatchObject(dataArray);
  });
});

describe('fetch search saga', () => {
  const values = {
    page: 1,
    count: 10,
  }

  const action = fetchSearch(values);
  const generator = cloneableGenerator(fetchSearchSaga)(action);

  it('should call fetch search api', () => {
    const result = generator.next().value;
    const expected = call([DashboardAPI, DashboardAPI.fetchSearch], values);

    expect(result.payload.fn).toEqual(expected.payload.fn);
    expect(result.payload.args[0]).toMatchObject({
      pagyInfo: {
        page: 1,
        count: 10,
      }
    });
  });

  it('should save search info to store after called api successfully', async () => {
    const response = {
      searchItems: undefined,
      pagyInfo: { count: 0, page: 0, pageCount: 0, total: 0 }
    };

    const result = generator.next(response).value;

    expect(result.payload.action.payload).toMatchObject(response);
  });
});

describe('calls `all()` with the correct functions', () => {
  const sagaAll = dashboardSaga();
  const effects = sagaAll.next().value;

  it('should take all effects', () => {
    expect(effects).toEqual(all([
      takeLatest(uploadCsv, uploadCsvSaga),
      takeLatest(fetchSearch, fetchSearchSaga),
    ]));
  });
});
