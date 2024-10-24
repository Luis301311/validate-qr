import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createStudentDto.password, saltRounds);

    const student = this.studentRepository.create({
      ...createStudentDto,
      password: hashedPassword,
    });
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);  // Verifica si el estudiante existe
    Object.assign(student, updateStudentDto);  // Actualiza los campos
    return this.studentRepository.save(student);
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
  }
}
