import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSportClassDto {
  @ApiProperty({
    description: 'The sport for the class (e.g., Soccer, Basketball)',
    example: 'Soccer',
  })
  @IsNotEmpty()
  @IsString()
  sport: string;

  @ApiProperty({
    description: 'The schedule for the class',
    example: 'Every Saturday at 10 AM',
  })
  @IsNotEmpty()
  @IsString()
  schedule: string;

  @ApiProperty({
    description: 'Duration of the class in minutes',
    example: 90,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'A brief description of the class',
    example: 'A fun soccer class for beginners',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Start date of the class in ISO format',
    example: '2024-10-01',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the class in ISO format',
    example: '2024-12-01',
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}

export class UpdateSportClassDto {
  @ApiProperty({
    description: 'The sport for the class (optional)',
    example: 'Basketball',
    required: false,
  })
  @IsString()
  sport?: string;

  @ApiProperty({
    description: 'The schedule for the class (optional)',
    example: 'Every Sunday at 11 AM',
    required: false,
  })
  @IsString()
  schedule?: string;

  @ApiProperty({
    description: 'Duration of the class in minutes (optional)',
    example: 60,
    required: false,
  })
  @IsNumber()
  duration?: number;

  @ApiProperty({
    description: 'A brief description of the class (optional)',
    example: 'A competitive basketball class for all levels',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Start date of the class in ISO format (optional)',
    example: '2024-10-01',
    required: false,
  })
  @IsDateString()
  startDate?: Date;

  @ApiProperty({
    description: 'End date of the class in ISO format (optional)',
    example: '2024-12-01',
    required: false,
  })
  @IsDateString()
  endDate?: Date;
}
