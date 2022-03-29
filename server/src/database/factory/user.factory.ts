import bcrypt from 'bcrypt';
import faker from 'faker';
import { getRepository } from 'typeorm';

import { UserEntity } from 'src/modules/users/user.entity';

export const createUser = async (
  user: Partial<UserEntity> = new UserEntity(),
) => {
  const salt = await bcrypt.genSalt(10);
  const password = user.password || faker.random.words();

  const factoryUser = await getRepository(UserEntity).save({
    name: user.name || faker.name.firstName(),
    username: user.username || faker.name.firstName(),
    email: user.email || faker.internet.email(),
    password: await bcrypt.hash(password, salt),
  });

  factoryUser.password = password;

  return factoryUser;
};
