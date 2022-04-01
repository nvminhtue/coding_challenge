import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../../common/base.entity';
import { EntityConstant } from '../../constants/entity.constant';
import { UserSearchEntity } from '../user-searches/user-search.entity';

@Entity('search_results')
export class SearchResultEntity extends BaseEntity {
  @OneToOne(() => UserSearchEntity, userSearch => userSearch.searchResult)
  @JoinColumn({ name: 'user_search_id' })
  userSearch: UserSearchEntity;

  @Column({ name: 'user_search_id' })
  userSearchId: string;

  @Column({
    name: 'adword_total',
    type: 'smallint',
    nullable: false,
  })
  adWordsTotal: number;

  @Column({
    name: 'link_total',
    type: 'smallint',
    nullable: false,
  })
  linkTotal: number;

  @Column({
    type: 'varchar',
    name: 'search_found',
    length: EntityConstant.ShortLength,
    nullable: false,
  })
  searchFound: string;

  @Column({
    name: 'preview',
    type: 'text',
    nullable: false,
  })
  preview: string;
}
