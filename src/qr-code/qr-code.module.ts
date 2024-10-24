import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [AuthModule],
  exports: [QrCodeService],
  controllers: [QrCodeController],
  providers: [QrCodeService],
})
export class QrCodeModule {}
