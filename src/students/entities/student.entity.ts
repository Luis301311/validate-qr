import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {

  @PrimaryColumn({ length: 20 })
  id: string; 

  @Column({ length: 100 })
  name: string; 
  
  @Column({ unique: true })
  email: string;  

  @Column()
  password: string; 

  @Column({ length: 15, nullable: true })
  phone: string; 
/* 
  @Column({ default: true })
  isActive: boolean; */
}
