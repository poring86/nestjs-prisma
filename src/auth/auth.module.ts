import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'test123',
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
