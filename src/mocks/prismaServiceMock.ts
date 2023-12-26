import { PrismaService } from 'src/prisma/prisma.service';
import { fakeUsers } from './fakeUsers';

export const prismaServiceMock = {
  provide: PrismaService,
  useValue: {
    user: {
      create: jest.fn().mockReturnValue(fakeUsers[0]),
      verify: jest.fn().mockReturnValue(fakeUsers[0]),
      findMany: jest.fn().mockResolvedValue(fakeUsers),
      findUnique: jest.fn().mockResolvedValue(fakeUsers[0]),
      update: jest.fn().mockResolvedValue(fakeUsers[0]),
      delete: jest.fn(), // O método delete não retorna nada
      count: jest.fn().mockResolvedValue(2),
    },
  },
};
