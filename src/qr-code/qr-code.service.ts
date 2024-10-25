import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import * as QRCode from 'qrcode';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QrCodeService {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService,) {}


  async generateQr(createQrCodeDto: CreateQrCodeDto): Promise<string> {
    try {
      const token =  await this.authService.login(createQrCodeDto);
      const decodedToken = this.jwtService.verify(token.access_token);
      const qrdata = {
        access_token: token,
        id: decodedToken.id,
        name: decodedToken.name,  // Agregar más datos al token, si es necesario
      }
      console.log("Toke", qrdata);
      const rqdataJson = JSON.stringify(qrdata);
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
