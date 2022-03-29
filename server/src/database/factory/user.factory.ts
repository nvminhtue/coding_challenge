import faker from 'faker';
import { getRepository } from 'typeorm';

import { UserEntity } from 'src/modules/users/user.entity';

export const createUser = async (
  user: Partial<UserEntity> = new UserEntity(),
) => {
  return getRepository(UserEntity).save({
    name: user.name || faker.name.firstName(),
    username: user.username || faker.name.firstName(),
    email: user.email || faker.internet.email(),
    password: user.password || faker.internet.color(),
  });
};
