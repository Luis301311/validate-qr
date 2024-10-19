import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}


  @Post('generate')
  async create(@Body() createQrCodeDto: CreateQrCodeDto) {
    console.log(createQrCodeDto)
    const qrImage = await this.qrCodeService.generateQr(createQrCodeDto);
    return { qrImage };
  }


  @Post('validate')
  validateQr(@Body() body: { qrCodeData: string }) {
    return this.qrCodeService.validarQr(body.qrCodeData);
  }
}
