import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/user.entity';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
