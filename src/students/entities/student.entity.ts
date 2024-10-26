import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Students {

  @PrimaryColumn({ length: 20 })
  id: string; 

  @Column()
  password: string; 

  @Column({ length: 100 })
  name: string; 


  @Column({ length: 100 })
  lastname: string;
  
  @Column({ unique: true })
  email: string;  

  @Column({ nullable: true })
  cohort1: string;

  @Column({ nullable: true })
  course1: string;

  @Column({ nullable: true })
  type1: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ length: 50, nullable: true })
  country: string;
}
