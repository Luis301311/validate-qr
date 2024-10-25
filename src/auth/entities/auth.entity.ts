import { Column, PrimaryColumn } from "typeorm";

export class Auth {
  @PrimaryColumn({ length: 20 })
  id: string; 

  @Column({ length: 100 })
  name: string; 
}
