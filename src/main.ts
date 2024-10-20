import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));

  app.enableCors({
    origin: '*', // Cambia esto por tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies
  });
   // Usar el puerto de la variable de entorno o el puerto 3000 por defecto
   const PORT = process.env.PORT || 3000;

   await app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
}
bootstrap();
