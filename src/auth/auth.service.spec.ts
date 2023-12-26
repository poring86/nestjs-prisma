import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaServiceMock } from 'src/mocks/prismaServiceMock';
import { UserService } from 'src/user/user.service';
import {
  fakeJwtPayload,
  fakeJwtToken,
  jwtServiceMock,
} from 'src/mocks/jwtServiceMock';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { userServiceMock } from 'src/mocks/usersServiceMock';
import { mailerServiceMock } from 'src/mocks/mailerServiceMock';
import { fakeUsers } from 'src/mocks/fakeUsers';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let mailer: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        prismaServiceMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
        AuthService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
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
    expect(authService).toBeDefined();
  });

  test('should create token', () => {
    const result = authService.createToken(fakeUsers[0]);

    expect(jwtService.sign).toHaveBeenCalledTimes(1);

    expect(jwtService.sign).toHaveBeenCalledWith(
      {
        id: fakeUsers[0].id,
        name: fakeUsers[0].name,
        email: fakeUsers[0].email,
      },
      {
        expiresIn: '7 days',
        subject: String(fakeUsers[0].id),
        audience: fakeJwtPayload.aud,
        issuer: fakeJwtPayload.iss,
      },
    );

    expect(result).toEqual({ accessToken: fakeJwtToken });
  });

  test('should check token', () => {
    const result = authService.checkToken(fakeJwtToken);

    expect(jwtService.verify).toHaveBeenCalledTimes(1);
    expect(jwtService.verify).toHaveBeenCalledWith(fakeJwtToken, {
      audience: fakeJwtPayload.aud,
      issuer: fakeJwtPayload.iss,
    });

    expect(result).toEqual(fakeJwtPayload);
  });
});
