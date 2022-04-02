import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

import { RequestPagyDTO } from './dto/request-pagy.dto';
import { PagyConstant } from './pagy.constant';
import { Pagy } from './type/pagy';

@Injectable()
export class PagyService<T> {
  async queryBuilderPaginate(
    requestPagyDTO: RequestPagyDTO,
    queryBuilder: SelectQueryBuilder<T>,
    distinct = false,
  ): Promise<Pagy<T>> {
    const page = requestPagyDTO.page || PagyConstant.DefaultPage;
    const count = requestPagyDTO.count || PagyConstant.DefaultCount;
    if (distinct) {
      queryBuilder = queryBuilder.take(count).skip((page - 1) * count);
    } else {
      queryBuilder = queryBuilder.limit(count).offset((page - 1) * count);
    }
    const [data, total] = await queryBuilder.getManyAndCount();
    const pageCount = Math.ceil(total / count);
    const pagyInfo = { count: data.length, total, page, pageCount };

    return [data, pagyInfo];
  }
}
