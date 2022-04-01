import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { BaseEntity } from '../../common/base.entity';
import { EntityConstant } from '../../constants/entity.constant';
import { UserSearchEntity } from '../user-searches/user-search.entity';

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
    length: EntityConstant.ShortLength,
   })
  name: string;

  @Column({
    type: 'varchar',
    name: 'username',
    nullable: false,
    length: EntityConstant.ShortLength,
   })
  username: string;

  @Column({
    type: 'varchar',
    name: 'password',
    nullable: false,
    length: EntityConstant.ShortLength,
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: false,
    length: EntityConstant.ShortLength,
  })
  email: string;

  @Column({
    type: 'text',
    name: 'refresh_token',
    nullable: true,
  })
  refreshToken: string;

  @OneToMany(() => UserSearchEntity, userSearch => userSearch.user)
  userSearches: UserSearchEntity[];
}
