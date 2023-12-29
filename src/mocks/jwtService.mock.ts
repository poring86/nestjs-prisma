import { JwtService } from '@nestjs/jwt';
import { fakeJwtToken } from './fakeJwtToken';
import { fakeJwtPayload } from './fakeJwtPayload';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(fakeJwtToken),
    verify: jest.fn().mockReturnValue(fakeJwtPayload),
  },
};
