import { AuthResetDTO } from '../auth/dto/auth-reset.dto';
import { fakeJwtToken } from './fakeJwtToken';

export const authResetDTO: AuthResetDTO = {
  password: '654321',
  token: fakeJwtToken,
};
