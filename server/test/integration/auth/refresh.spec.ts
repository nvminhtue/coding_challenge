import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';

import { closeApp, getResponse, initApp } from 'test/helpers/test.helper';

describe('Query accessToken by giving refreshToken', () => {
  let app: INestApplication;

  beforeAll(async (done) => {
    app = await initApp();
    done();
  })

  afterAll(async (done) => {
    await closeApp(app);

    done();
  })

  describe('Failure', () => {
    it('should return error when user is not login', async () => {
      const [status, res] = await getResponse(
        app,
        'get',
        `/token`,
      )

      expect(status).to.equal(401);
      expect(res.errors.message).to.eql('Unauthorized');
    })
  });
})
