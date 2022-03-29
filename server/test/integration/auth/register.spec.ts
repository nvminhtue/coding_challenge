import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';
import { getRepository } from 'typeorm';

import { UserEntity } from 'src/modules/users/user.entity';

import { closeApp, formatError, getResponse, initApp } from 'test/helpers/test.helper';

describe('Register', () => {
  let app: INestApplication;
  let variables: any;

  beforeAll(async (done) => {
    app = await initApp();
    done();
  })

  afterAll(async (done) => {
    await closeApp(app);

    done();
  })

  beforeEach(() => {
    variables = {
      name: 'name',
      username: 'username',
      email: 'user@email.com',
      password: 'randompassword',
      confirmPassword: 'randompassword'
    };
  })

  describe('Success', () => {
    it('should return sample with given id', async () => {
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
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
      expect(data.id).to.equal(user.id);
      expect(data.name).to.equal(user.name);
      expect(data.username).to.equal(user.username);
      expect(data.email).to.equal(user.email);
    })
  })

  describe('Failure caused by name', () => {
    it('should return error when name is missing', async () => {
      variables.name = '';
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field can not be empty', 'name')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })

    it('should return error when name is not string', async () => {
      variables.name = 123;
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field must have string type', 'name')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })

    it('should return error when name is exceeded 255 char', async () => {
      variables.name = 'a'.repeat(256);
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field exceed allowed characters', 'name')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })
  });

  describe('Failure caused by email', () => {
    it('should return error when email is missing', async () => {
      variables.email = '';
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
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
        '/register',
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
        '/register',
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
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field exceed allowed characters', 'email')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })
  })

  describe('Failure caused by username', () => {
    it('should return error when username is missing', async () => {
      variables.username = '';
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field can not be empty', 'username')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })

    it('should return error when username is not string', async () => {
      variables.username = 123;
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field must have string type', 'username')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })

    it('should return error when username is exceeded 255 char', async () => {
      variables.username = 'a'.repeat(256);
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field exceed allowed characters', 'username')
      expect(status).to.equal(400);
      expect(data.errors).to.eql(errors);
    })
  });

  describe('Failure caused by password', () => {
    it('should return error when password is missing', async () => {
      variables.password = '';
      variables.confirmPassword = '';
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field can not be empty', 'password')
      expect(status).to.equal(400);
      expect(data.errors[0]).to.eql(errors[0]);
    })

    it('should return error when password is not string', async () => {
      variables.password = 123;
      variables.confirmPassword = 123;
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field must have string type', 'password')
      expect(status).to.equal(400);
      expect(data.errors[0]).to.eql(errors[0]);
    })
  });

  describe('Failure caused by confirmPassword', () => {
    it('should return error when confirmPassword is missing', async () => {
      variables.confirmPassword = '';
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field can not be empty', 'confirmPassword')
      expect(status).to.equal(400);
      expect(data.errors[0]).to.eql(errors[0]);
    })

    it('should return error when confirmPassword is not string', async () => {
      variables.confirmPassword = 123;
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('This field must have string type', 'confirmPassword')
      expect(status).to.equal(400);
      expect(data.errors[0]).to.eql(errors[0]);
    })

    it('should return error when confirmPassword is not match password', async () => {
      variables.password = '123456';
      variables.confirmPassword = '12345';
      const [status, data] = await getResponse(
        app,
        'post',
        '/register',
        '',
        variables,
      );
      const errors = formatError('Confirm password should be matched with password', 'confirmPassword')
      expect(status).to.equal(400);
      expect(data.errors[0]).to.eql(errors[0]);
    })
  });
})
