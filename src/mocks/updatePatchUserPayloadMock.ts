import { UpdatePatchUserDTO } from 'src/user/dto/update-patch-user.dto';
import { Role } from '../enums/role.enum';

export const updatePatchUserDTO: UpdatePatchUserDTO = {
  role: Role.Admin,
};
