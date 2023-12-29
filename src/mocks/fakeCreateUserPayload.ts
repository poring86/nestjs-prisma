import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserPayloadMock: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'matheus@test.com',
  name: 'Matheus',
  password: '123456',
  role: Role.User,
};
