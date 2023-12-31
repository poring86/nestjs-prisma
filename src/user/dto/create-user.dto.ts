import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Matheus Lino',
    description: 'The user name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'The user email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'The user password',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '1995-10-10',
    description: 'The user birth date',
  })
  @IsOptional()
  @IsDateString()
  birthAt?: string;

  @ApiProperty({
    example: 1,
    description: 'The user Role. Can be 1 for user or 2 for admin',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
