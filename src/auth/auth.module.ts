import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports : [
    TypeOrmModule.forFeature([Student]), 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    })],
  providers: [AuthService, JwtStrategy]  ,
  controllers: [AuthController],
  exports : [AuthService],
})
export class AuthModule {}
