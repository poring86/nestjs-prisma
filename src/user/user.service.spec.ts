import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

const fakeUser = [
  {
    id: 11,
    name: 'test',
    email: 'test@test.com',
    password: '$2b$10$Ihn9y3wUaqUAzn0xpZXr6uLBPSYoKz0gRPIGfjG.TDAHmmHlY0YAa',
    birthAt: '1995-10-10T00:00:00.000Z',
    role: 1,
    createdAt: '2023-12-18T21:49:24.000Z',
    updatedAt: '2023-12-18T21:49:24.000Z',
  },
  {
    id: 12,
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

  it(`should return an array of user`, async () => {
    const response = await userService.list();

    expect(response).toEqual(fakeUser);
    expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
  });
});
