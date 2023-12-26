import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaServiceMock } from 'src/mocks/prismaServiceMock';
import { UserService } from 'src/user/user.service';
import { jwtServiceMock } from 'src/mocks/jwtServiceMock';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { userServiceMock } from 'src/mocks/usersServiceMock';
import { mailerServiceMock } from 'src/mocks/mailerServiceMock';

describe('AuthService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let mailer: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        prismaServiceMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    mailer = module.get<MailerService>(MailerService);
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(mailer).toBeDefined();
  });
});
