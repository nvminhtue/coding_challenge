import { Global, Module } from '@nestjs/common';

import { PagyService } from './pagy.service';

@Global()
@Module({
  imports: [],
  providers: [PagyService],
  exports: [PagyService],
})
export class PagyModule {}
