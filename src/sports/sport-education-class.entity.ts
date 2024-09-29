import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class SportEducationClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sport: string;

  @Column()
  schedule: string;

  @Column()
  duration: number;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(() => User, (user) => user.appliedClasses)
  users: User[];
}
