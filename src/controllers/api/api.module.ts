import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppService } from '../../app.service';

@Module({
  imports: [UsersModule],
  providers: [AppService],
})
export class ApiModule {}
