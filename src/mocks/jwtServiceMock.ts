import { JwtService } from '@nestjs/jwt';

export const fakeJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTcwMzM0MzM3MiwiZXhwIjoxNzA1OTM1MzcyLCJhdWQiOiJ1c2VycyIsImlzcyI6ImZvcmdldCIsInN1YiI6IjEyIn0.xFDbX77ojMh4x2dSanIxavPQYKFH5RsHbVzon5aYRyE';

export const fakeJwtPayload = {
  id: 1,
  name: 'Matheus',
  email: 'matheus@test.com',
  iat: 1672197163,
  exp: 1672801963,
  aud: 'users',
  iss: 'login',
  sub: '1',
};

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(fakeJwtToken),
    verify: jest.fn().mockResolvedValue(fakeJwtPayload),
  },
};
