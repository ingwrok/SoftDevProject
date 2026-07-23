import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Setup Swagger OpenAPI document
  const config = new DocumentBuilder()
    .setTitle('Pet Store API')
    .setDescription(
      'A simple and robust NestJS Pet Store API with OpenAPI documentation',
    )
    .setVersion('1.0')
    .addTag('pets', 'Operations related to pets')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Auto-generate openapi.json in the project root
  fs.writeFileSync(
    path.join(process.cwd(), 'openapi.json'),
    JSON.stringify(document, null, 2),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
