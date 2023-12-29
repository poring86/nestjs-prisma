import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { guardMock } from 'src/mocks/guard.mock';
import { authServiceMock } from 'src/mocks/authService.mock';
import { fileServiceMock } from 'src/mocks/fileService.mock';
import { fakeJwtToken } from 'src/mocks/fakeJwtToken';
import { authLoginDTO } from 'src/mocks/fakeLoginPayload';
import { authRegisterDTO } from 'src/mocks/fakeRegisterPayload';
import { authForgetDTO } from 'src/mocks/fakeForgotPayload';
import { authResetDTO } from 'src/mocks/fakeResetPayload';

describe('Auth controller', () => {
  let authController: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('verificar a definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Fluxo de autenticação', () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDTO);
      expect(result).toEqual({ accessToken: fakeJwtToken });
    });
    test('register method', async () => {
      const result = await authController.register(authRegisterDTO);
      expect(result).toEqual({ accessToken: fakeJwtToken });
    });
    test('forget method', async () => {
      const result = await authController.forget(authForgetDTO);
      expect(result).toEqual({ success: true });
    });
    test('reset method', async () => {
      const result = await authController.reset(authResetDTO);
      expect(result).toEqual({ accessToken: fakeJwtToken });
    });
  });
});
