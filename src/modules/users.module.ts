import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersRepository } from 'src/repositories/users.repository';
import { UsersServices } from 'src/services/users.services';
import { UsersController } from 'src/controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UsersRepository, UsersServices],
  controllers: [UsersController],
  exports: [UsersServices],
})
export class UserModule {}