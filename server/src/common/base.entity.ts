import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityConstant } from 'src/constants/entity.constant';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ precision: EntityConstant.TimePrecision })
  updated: Date;

  @CreateDateColumn({ precision: EntityConstant.TimePrecision })
  created: Date;

  @DeleteDateColumn({ type: 'timestamp', precision: EntityConstant.TimePrecision })
  deleted: Date;
}
