import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthForgetDTO {
  @ApiProperty({
    example: 'test@example.com',
    description: 'The user email',
  })
  @IsEmail()
  email: string;
}
