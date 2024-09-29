import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/get-user.dto';
import { User } from './users.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginResponseDto } from './dto/login-response.dto';
import { SportEducationClass } from 'src/sports/sport-education-class.entity';

@ApiTags('Users')
@Controller('auth')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: User,
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    return await this.usersService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: [UserDto],
  })
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('role/:id')
  @ApiOperation({ summary: 'Update user role by ID' })
  @ApiResponse({ status: 200, description: 'User role updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUserRole(
    @Param('id') id: number,
    @Body('role') role: UserRole,
  ): Promise<User> {
    return await this.usersService.updateUserRole(id, role);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.usersService.deleteUser(id);
  }

  @Get(':id/classes')
  @ApiOperation({ summary: 'Get classes a user has applied for' })
  @ApiResponse({
    status: 200,
    description: 'Classes retrieved successfully',
    type: [SportEducationClass],
  })
  async getUserClasses(
    @Param('id') id: number,
  ): Promise<SportEducationClass[]> {
    return await this.usersService.getUserAppliedClasses(id);
  }

  @Get('classes')
  @ApiOperation({ summary: 'Get all sports classes with optional filtering' })
  @ApiResponse({
    status: 200,
    description: 'Classes retrieved successfully',
  })
  async getClasses(@Query('sports') sports?: string): Promise<any[]> {
    const sportsList = sports ? sports.split(',') : [];
    return await this.usersService.getClassesFiltered(sportsList);
  }
}
