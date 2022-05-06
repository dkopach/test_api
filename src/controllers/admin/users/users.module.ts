import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule as UsersBaseModule } from './../../../models/users/users.module';

@Module({
  providers: [],
  controllers: [UsersController],
  imports: [UsersBaseModule],
})
export class UsersModule {}
