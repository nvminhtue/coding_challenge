import faker from 'faker';
import { getRepository } from 'typeorm';

import { SearchStatusEnum } from 'src/modules/user-searches/user-search.constant';
import { UserSearchEntity } from 'src/modules/user-searches/user-search.entity';

import { createUser } from './user.factory';

export const createUserSearch = async (
  userSearch: Partial<UserSearchEntity> = new UserSearchEntity(),
) => {

  return await getRepository(UserSearchEntity).save({
    user: userSearch.user || await createUser(),
    status: userSearch.status || SearchStatusEnum.Pending,
    searchValue: userSearch.searchResult || faker.name.firstName(),
    runAt: userSearch.runAt,
  });
};
