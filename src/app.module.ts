import { Module } from '@nestjs/common';
import { QrCodeModule } from './qr-code/qr-code.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [QrCodeModule, StudentsModule],
})
export class AppModule {}
