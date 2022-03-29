import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';
import { getRepository } from 'typeorm';

import { createUser } from 'src/database/factory/user.factory';
import { UserEntity } from 'src/modules/users/user.entity';

import { closeApp, getResponse, getSession, initApp } from 'test/helpers/test.helper';

describe('Logout', () => {
  let app: INestApplication;
  let user: UserEntity;
  let session: any;

  beforeAll(async (done) => {
    app = await initApp();
    user = await createUser();
    session = await getSession(app, user);

    done();
  })

  afterAll(async (done) => {
    await closeApp(app);

    done();
  })

  describe('Success', () => {
    it('should return with success code', async () => {
      const [status] = await getResponse(
        app,
        'post',
        '/logout',
        session,
      );

      const users = await getRepository(UserEntity).find({
        order: {
          created: 'DESC',
        },
      });
      const currentUser = users[0];

      expect(status).to.equal(200);
      expect(currentUser.refreshToken).to.equal(null);
    })
  })
});
