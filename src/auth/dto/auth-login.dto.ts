import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({
    example: 'test@example.com',
    description: 'The user email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The user password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
