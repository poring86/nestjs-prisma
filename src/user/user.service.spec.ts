import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaServiceMock } from 'src/mocks/prismaServiceMock';
import { fakeUsers } from 'src/mocks/fakeUsers';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, prismaServiceMock],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should list users', async () => {
    const response = await userService.list();

    expect(response).toEqual(fakeUsers);
    expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
  });

  it('should create a user', async () => {
    const response = await userService.create({
      name: 'test',
      email: 'test@test.com',
      password: '$2b$10$Ihn9y3wUaqUAzn0xpZXr6uLBPSYoKz0gRPIGfjG.TDAHmmHlY0YAa',
      birthAt: '1995-10-10T00:00:00.000Z',
      role: 1,
    });

    expect(response).toEqual(fakeUsers[0]);
    expect(prismaService.user.create).toHaveBeenCalledTimes(1);
  });

  it('should show a user', async () => {
    const id = 1;
    const response = await userService.show(id);

    expect(response).toEqual(fakeUsers[0]);
    expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a user', async () => {
    const id = 1;
    const password = '12345678';
    const date = '1997-10-10';
    const updateUserPayload = {
      email: 'test2@test.com',
      name: 'test2',
      password,
      birthAt: date,
      role: 1,
    };
    const response = await userService.update(id, updateUserPayload);

    expect(response).toEqual(fakeUsers[0]);
    expect(prismaService.user.update).toHaveBeenCalledTimes(1);
    expect(prismaService.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: 'test2@test.com',
          name: 'test2',
          password: expect.any(String),
          birthAt: new Date(date),
          role: 1,
        }),
        where: { id },
      }),
    );
  });

  it('should delete a user', async () => {
    const id = 1;
    await userService.delete(id);

    expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
    expect(prismaService.user.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });
});
