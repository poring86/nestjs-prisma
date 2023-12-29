import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from 'src/user/dto/update-put-user.dto';

export const updatePutUserDTO: UpdatePutUserDTO = {
  birthAt: '2000-01-01',
  email: 'matheus@test.com.br',
  name: 'Matheus',
  password: '123456',
  role: Role.User,
};
