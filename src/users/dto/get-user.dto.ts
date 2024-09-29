import { IsEmail, IsEnum } from 'class-validator';
import { User } from '../users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './create-user.dto';

export class UserDto {
  @ApiProperty({
    description: 'User ID',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: UserRole,
    description: 'The role of the user',
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
  }
}
