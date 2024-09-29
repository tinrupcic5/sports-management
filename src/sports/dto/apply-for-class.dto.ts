import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class ApplyForClassDto {
  @ApiProperty({
    description: 'The ID of the user applying for the class',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'The ID of the class the user is applying for',
    example: 101,
  })
  @IsNotEmpty()
  @IsInt()
  classId: number;
}
