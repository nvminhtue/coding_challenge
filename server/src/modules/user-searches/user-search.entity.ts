import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/base.entity';
import { EntityConstant } from '../../constants/entity.constant';
import { UserEntity } from '../users/user.entity';
import { SearchStatusEnum } from './user-search.constant';

@Entity('user_searches')
export class UserSearchEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, user => user.userSearches, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({
    type: 'varchar',
    name: 'search_value',
    nullable: false,
    length: EntityConstant.LongLength,
  })
  searchValue: string;

  @Column({
    type: 'smallint',
    name: 'status',
    nullable: false,
    default: SearchStatusEnum.Pending,
  })
  status: SearchStatusEnum;
}
