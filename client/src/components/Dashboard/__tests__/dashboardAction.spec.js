import { uploadCsv } from '../Dashboard.action';
import { ActionTypes } from '../Dashboard.constant';

describe('Auth Actions', () => {
  it('should create upload csv action', () => {

    const dataArray = new FormData();
    const actionReturnValue = uploadCsv(dataArray);

    expect(actionReturnValue.type).toEqual(ActionTypes.UPLOAD_CSV);
    expect(actionReturnValue.payload).toEqual(dataArray);
  });
});
