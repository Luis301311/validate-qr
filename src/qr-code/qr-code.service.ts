import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import * as QRCode from 'qrcode';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QrCodeService {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService,) {}


  async generateQr(token: String): Promise<string> {
    try {
      const rqdataJson = JSON.stringify(token);
      const qr = await QRCode.toDataURL(rqdataJson);
      return qr;
    } catch (error) {
      throw new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
    }
  }




  async validarQr(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token); // Verifica el token

      return {
        message: 'Token validado con éxito',
        userId: decodedToken.id, // Suponiendo que el ID del usuario está en el token
        name: decodedToken.name, // Y el nombre también
      };
    } catch (err) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }
  }
  
}
