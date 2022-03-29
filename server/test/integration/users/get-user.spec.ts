import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';
import { v4 } from 'uuid';

import { createUser } from 'src/database/factory/user.factory';
import { UserEntity } from 'src/modules/users/user.entity';

import { closeApp, formatFullError, getResponse, getSession, initApp } from 'test/helpers/test.helper';

describe('Query specific item of sample entity', () => {
  let app: INestApplication;
  let user: UserEntity;
  let session: string;

  beforeAll(async (done) => {
    app = await initApp();
    user = await createUser();
    session = await getSession(app, user)
    done();
  })

  afterAll(async (done) => {
    await closeApp(app);

    done();
  })

  describe('Success', () => {
    it('should return user with given id', async () => {
      const [status, data] = await getResponse(
        app,
        'get',
        `/users/${user.id}`,
        session,
      )

      expect(status).to.equal(200);
      expect(data.id).to.equal(user.id);
      expect(data.name).to.equal(user.name);
      expect(data.username).to.equal(user.username);
      expect(data.email).to.equal(user.email);
    })
  })

  describe('Failure', () => {
    it('should return error when user is not login', async () => {
      const [status, res] = await getResponse(
        app,
        'get',
        `/users/${user.id}`,
      )

      expect(status).to.equal(401);
      expect(res.errors.message).to.eql('Unauthorized');
    })

    it('should return error when id is not id', async () => {
      const [status, res] = await getResponse(
        app,
        'get',
        `/users/abc`,
        session,
      )
      const errors = formatFullError(2003, 'Not UUID', 'id', null);

      expect(status).to.equal(400);
      expect(res.errors).to.eql(errors);
    })

    it('should return error when id is not exist', async () => {
      const [status, res] = await getResponse(
        app,
        'get',
        `/users/${v4()}`,
        session,
      )
      const errors = formatFullError(2001, 'Entity not found', 'id', UserEntity.name);

      expect(status).to.equal(404);
      expect(res.errors).to.eql(errors);
    })
  })
})
