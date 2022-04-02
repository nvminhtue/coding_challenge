import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from '../../common/base.entity';
import { EntityConstant } from '../../constants/entity.constant';
import { SearchResultEntity } from '../search-results/search-result.entity';
import { UserEntity } from '../users/user.entity';
import { SearchStatusEnum } from './user-search.constant';

@Entity('user_searches')
export class UserSearchEntity extends BaseEntity {
  @OneToOne(() => SearchResultEntity, searchResult => searchResult.userSearch)
  searchResult: SearchResultEntity;

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

  @Column({ name: 'attempts_made', default: 0, type: 'int' })
  attemptsMade: number;

  @Column({ type: 'timestamptz', name: 'run_at', default: () => 'now()' })
  runAt: Date;
}
