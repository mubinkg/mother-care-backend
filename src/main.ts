import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*', // This allows requests from all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials if needed
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
  console.log(`app started on http://localhost:3000`)
}
bootstrap();
