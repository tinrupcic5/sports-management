import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';
import { SportEducationClass } from './sport-education-class.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SportEducationClass, User])],
  providers: [SportsService],
  controllers: [SportsController],
  exports: [TypeOrmModule],
})
export class SportsModule {}
