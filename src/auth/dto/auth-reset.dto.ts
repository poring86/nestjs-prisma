import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString, MinLength } from 'class-validator';

export class AuthResetDTO {
  @ApiProperty({
    example: '123456',
    description: 'The user password',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5hbWUiOiJNYXRoZXVzIiwiZW1haWwiOiJtYXRoZXVzQHRlc3QuY29tIiwiaWF0IjoxNzAzNjQwMDk2LCJleHAiOjE3MDQyNDQ4OTYsImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxMiJ9.cCeGSs2f8Qi4Cl-kvZ07nKmx1rMyAYKgVqoVrB2SXi8',
    description: 'A valid token',
  })
  @IsJWT()
  token: string;
}
