import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor ( 
    @InjectRepository(Student) private userRepository : Repository<Student>,
    private jwtServices: JwtService
){}

  async login(createAuthDto: any) {
    try{
      const { id, password } = createAuthDto;
      const validateStudent = await this.userRepository.findOne({where : {id} })
      if (!validateStudent) {
        throw new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
      }
      const isPasswordValid = await bcrypt.compare(password, validateStudent.password);
      if (!isPasswordValid) {
        throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
      }
      const payload = { id: validateStudent.id , name : validateStudent.name};
      return {
        access_token: this.jwtServices.sign(payload),
      };
    }catch(err){
      if (err instanceof HttpException) {
        throw err; 
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  private seachStudent(id: string, password: string) {
    return this.students.find(
      estudiante => estudiante.id === id && estudiante.password ===  password
    );
  }
  private students = [
    { password:"1",  name: 'Juan Perez', id: '12345678' },
    { password:"2",  name: 'Maria Lopez', id: '87654321' },
    { password:"3",  name: 'Carlos Garcia', id: '11223344' },
    { password:"4",  name: 'Laura Martinez', id: '55667788' },
    { password:"5",  name: 'Ana Torres', id: '99887766' },
  ];
}