import * as crypto from "crypto";

if (!(global as any).crypto) {
  (global as any).crypto = crypto;
}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("API de Processamento de Dados")
    .setDescription("Documentação com Swagger")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT);
  Logger.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
}
bootstrap();
