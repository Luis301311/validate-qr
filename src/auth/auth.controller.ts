import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Get('success')
  @HttpCode(200)
  Login(@Body() createAuthDto: any) {
    return this.authService.login(createAuthDto);
  }
}
