import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';

import { createSearchResult } from 'src/database/factory/search-results.factory.';
import { createUserSearch } from 'src/database/factory/search-task.factory';
import { createUser } from 'src/database/factory/user.factory';
import { SearchResultEntity } from 'src/modules/search-results/search-result.entity';
import { UserSearchEntity } from 'src/modules/user-searches/user-search.entity';
import { UserEntity } from 'src/modules/users/user.entity';

import { closeApp, getResponse, getSession, initApp } from 'test/helpers/test.helper';

describe('Query specific item of user entity', () => {
  let app: INestApplication;
  let user: UserEntity;
  let userSearch: UserSearchEntity;
  let searchResult: SearchResultEntity;
  let session: string;

  beforeAll(async (done) => {
    app = await initApp();
    user = await createUser();
    userSearch = await createUserSearch({
      user,
      status: 1,
    })
    searchResult = await createSearchResult({
      userSearch,
    });
    session = await getSession(app, user)
    done();
  })

  afterAll(async (done) => {
    await closeApp(app);

    done();
  })

  describe('Success', () => {
    it('should return search result belong to current user', async () => {
      const [status, data] = await getResponse(
        app,
        'get',
        `/search-list`,
        session,
      )

      expect(status).to.equal(200);
      expect(data.pagyInfo.count).to.equal(1);
      expect(data.pagyInfo.page).to.equal(1);
      expect(data.pagyInfo.pageCount).to.equal(1);
      expect(data.pagyInfo.total).to.equal(1);
      expect(data.items.length).to.equal(1);
      expect(data.items[0].id).to.equal(userSearch.id);
      expect(data.items[0].userId).to.equal(user.id);
      expect(new Date(data.items[0].runAt)).to.eql(new Date(userSearch.runAt));
      expect(data.items[0].searchValue).to.equal(userSearch.searchValue);
      expect(data.items[0].searchResult.id).to.equal(searchResult.id);
    })
  })

  describe('Failure', () => {
    it('should return error when user is not login', async () => {
      const [status, res] = await getResponse(
        app,
        'get',
        `/search-list`,
      )

      expect(status).to.equal(401);
      expect(res.errors.message).to.eql('Unauthorized');
    })
  })
})
