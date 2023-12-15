import { Module } from '@nestjs/common';
import { UserController } from './users.controllers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
