import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.useGlobalPipes( new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle("Capstone NODE38")
  .addBearerAuth()
  .setDescription("Đây là list API về Movie")
  .setVersion("1.0")
  .build()

  // apply swagger cho NestJS
  const swagger = SwaggerModule.createDocument(app,config);

  // setup swagger với đường dẫn là /swagger
  SwaggerModule.setup("swagger",app,swagger)

  await app.listen(3000);
}
bootstrap();
