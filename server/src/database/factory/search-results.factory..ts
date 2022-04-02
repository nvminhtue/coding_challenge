import faker from 'faker';
import { getRepository } from 'typeorm';

import { SearchResultEntity } from 'src/modules/search-results/search-result.entity';

import { createUserSearch } from './search-task.factory';

export const createSearchResult = async (
  searchResult: Partial<SearchResultEntity> = new SearchResultEntity(),
) => {

  return await getRepository(SearchResultEntity).save({
    userSearch: searchResult.userSearch || await createUserSearch(),
    adWordsTotal: searchResult.adWordsTotal || faker.datatype.number(1, 10),
    linkTotal: searchResult.linkTotal || faker.datatype.number(1, 10),
    preview: searchResult.preview || faker.lorem.sentence(),
    searchFound: searchResult.searchFound || faker.lorem.sentence(),
  });
};
