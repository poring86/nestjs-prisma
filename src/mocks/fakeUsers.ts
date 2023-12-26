import { User } from '@prisma/client';

export const fakeUsers: User[] = [
  {
    id: 1,
    name: 'test',
    email: 'test@test.com',
    password: '$2b$10$Ihn9y3wUaqUAzn0xpZXr6uLBPSYoKz0gRPIGfjG.TDAHmmHlY0YAa',
    birthAt: new Date('2000-01-01'),
    role: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Matheus',
    email: 'matheus@test.com',
    password: '$2b$10$8PfiN6WK10YtQB15QOTHPu5/q7YuqoMp1WrOoG1jYHDY6elJGM3aS',
    birthAt: new Date('2000-01-01'),
    role: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
