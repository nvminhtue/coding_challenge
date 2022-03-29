import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';
import { getRepository } from 'typeorm';

import { createUser } from 'src/database/factory/user.factory';
import { UserEntity } from 'src/modules/users/user.entity';

import { closeApp, formatError, getResponse, initApp } from 'test/helpers/test.helper';

describe('Login', () => {
  let app: INestApplication;
  let variables: any;

  beforeAll(async (done) => {
    app = await initApp();
    await createUser({
      email: 'test@email.com',
      password: 'password'
    })
    done();
  })

  afterAll(async (done) => {
    await closeApp(app);

    done();
  })

  beforeEach(() => {
    variables = {
      email: 'test@email.com',
      password: 'password',
    };
  })

  describe('Success', () => {
    it('should return sample with given id', async () => {
      const [status, data] = await getResponse(
        app,
        'post',
        '/login',
        '',
        variables,
      );

      const users = await getRepository(UserEntity).find({
        order: {
          created: 'DESC',
        },
      });
      const user = users[0];

      expect(status).to.equal(201);
      expect(data.accessToken).not.equal(null);
      expect(user.email).to.equal('test@email.com');
    })
  })

  describe('Failure caused by email', () => {
    it('should return error when email is missing', async () => {
      variables.email = '';
      const [status, data] = await getResponse(
        app,
        'post',
        '/login',
        '',
        variables,
      );
      const errors = formatError('This field can not be empty', 'email')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })

    it('should return error when email is not string', async () => {
      variables.email = 123;
      const [status, data] = await getResponse(
        app,
        'post',
        '/login',
        '',
        variables,
      );
      const errors = formatError('This field must have string type', 'email')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })

    it('should return error if not matched email type', async () => {
      variables.email = 'aaa';
      const [status, data] = await getResponse(
        app,
        'post',
        '/login',
        '',
        variables,
      );
      const errors = formatError('This field must have email type', 'email')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })

    it('should return error when name is exceeded 255 char', async () => {
      variables.email = 'a'.repeat(256).concat('@gmail.com');
      const [status, data] = await getResponse(
        app,
        'post',
        '/login',
        '',
        variables,
      );
      const errors = formatError('This field exceed allowed characters', 'email')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })
  })

  describe('Failure caused by password', () => {
    it('should return error when password is missing', async () => {
      variables.password = '';
      const [status, data] = await getResponse(
        app,
        'post',
        '/login',
        '',
        variables,
      );
      const errors = formatError('This field can not be empty', 'password')
      expect(status).to.equal(400);
      expect(data.errors[0]).to.eql(errors[0]);
    })

    it('should return error when password is not string', async () => {
      variables.password = 123;
      const [status, data] = await getResponse(
        app,
        'post',
        '/login',
        '',
        variables,
      );
      const errors = formatError('This field must have string type', 'password')
      expect(status).to.equal(400);
      expect(data.errors[0]).to.eql(errors[0]);
    })

    it('should return error when password is not matched', async () => {
      variables.password = 'wrongpassword';
      const [status, data] = await getResponse(
        app,
        'post',
        '/login',
        '',
        variables,
      );
      expect(status).to.equal(400);
      expect(data.errors.message).to.equal('Wrong password');
      expect(data.errors.property).to.equal('password');
    })
  });
})
