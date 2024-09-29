import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securepassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    enum: UserRole,
    description: 'The role of the user',
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
