import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportEducationClass } from './sport-education-class.entity';

import {
  CreateSportClassDto,
  UpdateSportClassDto,
} from './dto/create-sport-class.dto';
import { User } from 'src/users/users.entity';
import { ApplyForClassDto } from './dto/apply-for-class.dto';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(SportEducationClass)
    private readonly sportClassRepository: Repository<SportEducationClass>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createClass(
    createSportClassDto: CreateSportClassDto,
  ): Promise<SportEducationClass> {
    const sportClass = this.sportClassRepository.create(createSportClassDto);
    return await this.sportClassRepository.save(sportClass);
  }

  async getClasses(sports: string[]): Promise<SportEducationClass[]> {
    const classes = await this.sportClassRepository.find();

    if (sports && sports.length > 0) {
      return classes.filter((sportClass) => sports.includes(sportClass.sport));
    }

    return classes;
  }

  async applyForClass(applyForClassDto: ApplyForClassDto): Promise<void> {
    const { userId, classId } = applyForClassDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['appliedClasses'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const sportClass = await this.sportClassRepository.findOne({
      where: { id: classId },
      relations: ['users'],
    });
    if (!sportClass) {
      throw new NotFoundException('Class not found');
    }
    if (user.appliedClasses.some((sc) => sc.id === classId)) {
      throw new Error('User has already applied to this class');
    }

    user.appliedClasses.push(sportClass);
    await this.userRepository.save(user);
  }

  async getClassById(id: number): Promise<SportEducationClass> {
    const sportClass = await this.sportClassRepository.findOne({
      where: { id },
    });
    if (!sportClass) {
      throw new NotFoundException('Sport Education Class not found');
    }
    return sportClass;
  }

  async updateClass(
    id: number,
    updateSportClassDto: UpdateSportClassDto,
  ): Promise<SportEducationClass> {
    const sportClass = await this.getClassById(id);
    Object.assign(sportClass, updateSportClassDto);
    return await this.sportClassRepository.save(sportClass);
  }

  async deleteClass(id: number): Promise<void> {
    const sportClass = await this.getClassById(id);
    await this.sportClassRepository.remove(sportClass);
  }
}
