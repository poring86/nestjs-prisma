import { AuthService } from '../auth/auth.service';
import { fakeJwtPayload } from './fakeJwtPayload';
import { fakeJwtToken } from './fakeJwtToken';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ accessToken: fakeJwtToken }),
    checkToken: jest.fn().mockReturnValue(fakeJwtPayload),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue({ accessToken: fakeJwtToken }),
    forget: jest.fn().mockResolvedValue({ success: true }),
    reset: jest.fn().mockResolvedValue({ accessToken: fakeJwtToken }),
    register: jest.fn().mockResolvedValue({ accessToken: fakeJwtToken }),
  },
};
