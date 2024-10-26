import { Controller, Post, Headers, HttpException, HttpStatus, Body  } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}


  @Post('generate')
  async create(@Body() token: String) {
    const qrImage = await this.qrCodeService.generateQr(token);
    return { qrImage };
  }


  @Post('validate')
  async validateQr(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Authorization header missing or invalid', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1]; // Extraer el token del encabezado
    return await this.qrCodeService.validarQr(token);
  }
}
