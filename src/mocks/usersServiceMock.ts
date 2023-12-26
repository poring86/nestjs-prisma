import { fakeUsers } from './fakeUsers';
import { UserService } from 'src/user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn().mockReturnValue(fakeUsers[0]),
  },
};
