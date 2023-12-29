import { UserService } from 'src/user/user.service';
import { fakeUsers } from './fakeUsers';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    list: jest.fn().mockResolvedValue(fakeUsers),
    show: jest.fn().mockResolvedValue(fakeUsers[0]),
    create: jest.fn().mockResolvedValue(fakeUsers[0]),
    update: jest.fn().mockResolvedValue(fakeUsers[0]),
    updatePartial: jest.fn().mockResolvedValue(fakeUsers[0]),
    delete: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};
