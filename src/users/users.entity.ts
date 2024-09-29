import { SportEducationClass } from 'src/sports/sport-education-class.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @ManyToMany(() => SportEducationClass, (sportClass) => sportClass.users)
  @JoinTable()
  appliedClasses: SportEducationClass[];
}
