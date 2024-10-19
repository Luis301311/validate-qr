import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import * as QRCode from 'qrcode';
import { json } from 'stream/consumers';

@Injectable()
export class QrCodeService {
  private students = [
    { name: 'Juan Perez', id: '12345678' },
    { name: 'Maria Lopez', id: '87654321' },
    { name: 'Carlos Garcia', id: '11223344' },
    { name: 'Laura Martinez', id: '55667788' },
    { name: 'Ana Torres', id: '99887766' },
  ];

  async generateQr(createQrCodeDto: CreateQrCodeDto): Promise<string> {
    try {
      const validateStudent = this.buscarEstudiante(createQrCodeDto.name, createQrCodeDto.id);
      if (!validateStudent) {
        throw new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
      }
      const data = JSON.stringify(createQrCodeDto);
      const qr = await QRCode.toDataURL(data);
      return qr;
    } catch (error) {
      throw new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async validarQr(qrCodeData: string): Promise<boolean> {
    try {
      const json = JSON.parse(qrCodeData);
      const { name, id } = json;
  
      // Buscar el estudiante
      const validateStudent = this.buscarEstudiante(name, id);
      return validateStudent !== undefined; 
    } catch (error) {
      console.error("Error al validar el código QR:", error);
      throw new Error('Error al validar el código QR');
    }
  }
  

  private buscarEstudiante(name: string, id: string) {
    return this.students.find(
      estudiante => estudiante.name === name && estudiante.id === id
    );
  }
}
