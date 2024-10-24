import { Module } from '@nestjs/common';
import { QrCodeModule } from './qr-code/qr-code.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    QrCodeModule, StudentsModule, AuthModule],
})
export class AppModule {}
