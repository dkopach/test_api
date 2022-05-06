import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  providers: [],
  imports: [UsersModule],
})
export class AdminModule {}
