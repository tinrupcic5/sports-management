import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SportsService } from './sports.service';
import {
  CreateSportClassDto,
  UpdateSportClassDto,
} from './dto/create-sport-class.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SportEducationClass } from 'src/sports/sport-education-class.entity';
import { UserRole } from 'src/users/dto/create-user.dto';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApplyForClassDto } from './dto/apply-for-class.dto';

@ApiTags('Sport Classes')
@Controller('api/classes')
@ApiBearerAuth()
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sports classes' })
  @ApiResponse({
    status: 200,
    description: 'List of sports classes',
    type: [SportEducationClass],
  })
  async getAllClasses(
    @Query('sports') sports?: string,
  ): Promise<SportEducationClass[]> {
    const sportsList = sports ? sports.split(',') : [];
    return await this.sportsService.getClasses(sportsList);
  }

  @Post('apply')
  @ApiOperation({ summary: 'Apply for a sport class' })
  @ApiResponse({
    status: 201,
    description: 'User applied for class successfully',
  })
  @ApiResponse({ status: 404, description: 'User or Class not found' })
  async applyForClass(
    @Body() applyForClassDto: ApplyForClassDto,
  ): Promise<void> {
    return await this.sportsService.applyForClass(applyForClassDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sport class by ID' })
  @ApiResponse({
    status: 200,
    description: 'Sport class found',
    type: SportEducationClass,
  })
  @ApiResponse({ status: 404, description: 'Sport class not found' })
  async getClassById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SportEducationClass> {
    return await this.sportsService.getClassById(id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new sport class' })
  @ApiResponse({
    status: 201,
    description: 'Sport class created',
    type: SportEducationClass,
  })
  async createClass(
    @Body() createSportClassDto: CreateSportClassDto,
  ): Promise<SportEducationClass> {
    return await this.sportsService.createClass(createSportClassDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update sport class by ID' })
  @ApiResponse({
    status: 200,
    description: 'Sport class updated',
    type: SportEducationClass,
  })
  @ApiResponse({ status: 404, description: 'Sport class not found' })
  async updateClass(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSportClassDto: UpdateSportClassDto,
  ): Promise<SportEducationClass> {
    return await this.sportsService.updateClass(id, updateSportClassDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete sport class by ID' })
  @ApiResponse({ status: 200, description: 'Sport class deleted' })
  @ApiResponse({ status: 404, description: 'Sport class not found' })
  async deleteClass(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.sportsService.deleteClass(id);
  }
}
