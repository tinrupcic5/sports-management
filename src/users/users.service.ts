import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SportEducationClass } from 'src/sports/sport-education-class.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(SportEducationClass)
    private readonly sportClassRepository: Repository<SportEducationClass>,

    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role,
    });

    return await this.userRepository.save(user);
  }

  async getUserAppliedClasses(userId: number): Promise<SportEducationClass[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['appliedClasses'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.appliedClasses;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUserRole(id: number, role: UserRole): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    user.role = role;
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getClassesFiltered(sports: string[]): Promise<any[]> {
    const classes = await this.sportClassRepository.find();
    if (sports.length === 0) {
      return classes;
    }
    return classes.filter((classItem) => sports.includes(classItem.sport));
  }
}
