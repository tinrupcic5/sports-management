import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { SportsModule } from '../sports/sports.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    forwardRef(() => SportsModule),
  ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
