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
import { authRegisterDTO } from 'src/mocks/authRegisterMock';

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

  test('should success login', async () => {
    const result = await authService.login(fakeUsers[1].email, '1234567');

    expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1);

    expect(result).toEqual({ accessToken: fakeJwtToken });
  });

  test('should fail login with wrong password', async () => {
    await expect(
      authService.login(fakeUsers[1].email, '12345678'),
    ).rejects.toThrow('E-mail e/ou senha incorretos.');

    expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1);

    const spy = jest.spyOn(prismaService.user, 'findFirst');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should fail login with wrong email', async () => {
    jest
      .spyOn(prismaService.user, 'findFirst')
      .mockResolvedValueOnce(false as any);

    await expect(
      authService.login('wrong@test.com', '1234567'),
    ).rejects.toThrow('E-mail e/ou senha incorretos.');

    expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1);
  });

  test('should success forget method', async () => {
    const email = 'matheus@test.com';

    const result = await authService.forget(email);

    expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findFirst).toHaveBeenCalledWith({
      where: {
        email,
      },
    });

    expect(result).toEqual({ success: true });
  });

  test('should success on reset method', async () => {
    const result = await authService.reset('654321', fakeJwtToken);

    expect(jwtService.verify).toHaveBeenCalledTimes(1);
    expect(jwtService.verify).toHaveBeenCalledWith(fakeJwtToken, {
      audience: fakeJwtPayload.aud,
      issuer: 'forget',
    });

    expect(prismaService.user.update).toHaveBeenCalledTimes(1);

    expect(result).toEqual({ accessToken: fakeJwtToken });
  });

  test('should fail on reset method with invalid token', async () => {
    jest.spyOn(jwtService, 'verify').mockReturnValueOnce(false as any);

    expect(authService.reset('654321', fakeJwtToken)).rejects.toThrow(
      'Token é inválido',
    );
  });

  test('should register new user', async () => {
    const result = await authService.register(authRegisterDTO);
    expect(result).toEqual({ accessToken: fakeJwtToken });
  });
});
