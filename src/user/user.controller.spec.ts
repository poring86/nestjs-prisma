import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { guardMock } from 'src/mocks/guard.mock';
import { fakeUsers } from 'src/mocks/fakeUsers';
import { createUserPayloadMock } from 'src/mocks/fakeCreateUserPayload';
import { updatePatchUserDTO } from 'src/mocks/updatePatchUserPayload.mock';
import { updatePutUserDTO } from 'src/mocks/updatePutUserPayload.mock';
import { userServiceMock } from 'src/mocks/userService.mock';

describe('User controller', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validar a definição', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos Guards no controller', () => {
    test('Se os guards estão aplicados', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await userController.create(createUserPayloadMock);

      expect(result).toEqual(fakeUsers[0]);
    });
  });

  test('list method', async () => {
    const result = await userController.list();

    expect(result).toEqual(fakeUsers);
  });

  describe('Read', () => {
    test('show method', async () => {
      const result = await userController.show(1);

      expect(result).toEqual(fakeUsers[0]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await userController.update(updatePutUserDTO, 1);

      expect(result).toEqual(fakeUsers[0]);
    });
    test('updatePartial method', async () => {
      const result = await userController.updatePartial(updatePatchUserDTO, 1);

      expect(result).toEqual(fakeUsers[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual({ success: true });
    });
  });
});
