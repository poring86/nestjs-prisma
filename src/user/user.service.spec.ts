import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

const fakeUser = [
  {
    id: 1,
    name: 'test',
    email: 'test@test.com',
    password: '$2b$10$Ihn9y3wUaqUAzn0xpZXr6uLBPSYoKz0gRPIGfjG.TDAHmmHlY0YAa',
    birthAt: '1995-10-10T00:00:00.000Z',
    role: 1,
    createdAt: '2023-12-18T21:49:24.000Z',
    updatedAt: '2023-12-18T21:49:24.000Z',
  },
  {
    id: 2,
    name: 'Matheus',
    email: 'matheus@test.com',
    password: '$2b$10$8PfiN6WK10YtQB15QOTHPu5/q7YuqoMp1WrOoG1jYHDY6elJGM3aS',
    birthAt: '1995-10-10T00:00:00.000Z',
    role: 2,
    createdAt: '2023-12-18T21:51:16.000Z',
    updatedAt: '2023-12-18T21:51:16.000Z',
  },
];

const prismaMock = {
  user: {
    create: jest.fn().mockReturnValue(fakeUser[0]),
    findMany: jest.fn().mockResolvedValue(fakeUser),
    findUnique: jest.fn().mockResolvedValue(fakeUser[0]),
    update: jest.fn().mockResolvedValue(fakeUser[0]),
    delete: jest.fn(), // O método delete não retorna nada
    count: jest.fn().mockResolvedValue(2),
  },
};

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should list users', async () => {
    const response = await userService.list();

    expect(response).toEqual(fakeUser);
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

    expect(response).toEqual(fakeUser[0]);
    expect(prismaService.user.create).toHaveBeenCalledTimes(1);
  });

  it('should show a user', async () => {
    const id = 1;
    const response = await userService.show(id);

    expect(response).toEqual(fakeUser[0]);
    expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a user', async () => {
    const id = 1;
    const password = '12345678';
    const updateUserPayload = {
      email: 'test2@test.com',
      name: 'test2',
      password,
      birthAt: '1997-10-10',
      role: 1,
    };
    const response = await userService.update(id, updateUserPayload);

    expect(response).toEqual(fakeUser[0]);
    expect(prismaService.user.update).toHaveBeenCalledTimes(1);
    expect(prismaService.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: 'test2@test.com',
          name: 'test2',
          password: expect.any(String),
          birthAt: new Date('1997-10-10'),
          role: 1,
        }),
        where: { id },
      }),
    );
  });
});
