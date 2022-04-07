import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';
import { getRepository } from 'typeorm';

import { createUser } from 'src/database/factory/user.factory';
import { UserSearchEntity } from 'src/modules/user-searches/user-search.entity';
import { UserEntity } from 'src/modules/users/user.entity';

import {
  closeApp,
  formatFullError,
  getResponse,
  getSession,
  initApp,
} from 'test/helpers/test.helper';

import * as CSVParser from '../../../src/utils/csv-parser.util';
// import jwt from 'jsonwebtoken';


describe('Query specific item of user entity', () => {
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
    it('should return success with uploaded file', async () => {
      jest.spyOn(CSVParser, 'CSVParserToString').mockReturnValue(['a', 'b'])

      const [status] = await getResponse(
        app,
        'post',
        `/search-list/uploadCsv`,
        session,
      )

      const userSearches = await getRepository(UserSearchEntity).find({
        order: {
          searchValue: 'ASC',
          created: 'DESC',
        },
      });

      expect(status).to.equal(201);
      expect(userSearches.length).to.equal(2);
      expect(userSearches[0].searchValue).to.equal('a');
      expect(userSearches[1].searchValue).to.equal('b');
    })
  })

  describe('Failure', () => {
    it('should return error when user is not login', async () => {
      const [status, res] = await getResponse(
        app,
        'post',
        `/search-list/uploadCsv`,
      )

      expect(status).to.equal(401);
      expect(res.errors.message).to.eql('Unauthorized');
    })
  })

  it('should throw error with uploaded file with more than 100 keywords', async () => {
    const a = [];
    a.length = 101;
    jest.spyOn(CSVParser, 'CSVParserToString').mockReturnValue(a)

    const [status, data] = await getResponse(
      app,
      'post',
      `/search-list/uploadCsv`,
      session,
    )

    const error = formatFullError(2010, 'Number of searching keywords should be less than 100', 'uploadCsvFile', null)

    expect(status).to.equal(400);
    expect(data.errors).to.eql(error);
  })
})
