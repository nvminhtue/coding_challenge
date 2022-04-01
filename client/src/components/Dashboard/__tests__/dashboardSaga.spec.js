import { cloneableGenerator } from '@redux-saga/testing-utils';
import { all, call, takeLatest } from 'redux-saga/effects';

import { uploadCsv } from '../Dashboard.action';
import dashboardSaga, { uploadCsvSaga } from '../Dashboard.saga';
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

describe('calls `all()` with the correct functions', () => {
  const sagaAll = dashboardSaga();
  const effects = sagaAll.next().value;

  it('should take all effects', () => {
    expect(effects).toEqual(all([
      takeLatest(uploadCsv, uploadCsvSaga),
    ]));
  });
});
