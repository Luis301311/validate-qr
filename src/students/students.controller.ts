import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-authguard';


@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    console.log('createStudent', createStudentDto);
    return this.studentsService.create(createStudentDto);
  }

  @Get()
/*   @UseGuards(JwtAuthGuard) */
  findAll() {
    return this.studentsService.findAll();
  }

  

  @UseGuards(JwtAuthGuard)
  @Get('/user/profile')
  getUserInfo(@Param('userId') userId: string, @Req() req) {
    const loggedInUserId = req.user.id; 
    return this.studentsService.findOne(loggedInUserId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
