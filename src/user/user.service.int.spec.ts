import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);

    await prismaService.user.deleteMany({});
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should create a user', async () => {
    const data = {
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      birthAt: '1995-10-10T00:00:00.000Z',
      role: 1,
    };

    const response = await userService.create(data);

    expect(response.name).toBe(data.name);
    expect(response.email).toBe(data.email);
    expect(typeof response.password).toBe('string');
    expect(response.role).toBe(data.role);
  });
});
