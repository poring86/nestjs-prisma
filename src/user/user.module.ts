import { Module } from '@nestjs/common';
import { UserController } from './users.controllers';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
