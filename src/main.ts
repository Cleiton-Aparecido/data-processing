import * as crypto from "crypto";

if (!(global as any).crypto) {
  (global as any).crypto = crypto;
}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { setupSwagger } from "./config/swagger.config";

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

  setupSwagger(app);

  await app.listen(process.env.PORT);
  Logger.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
}
bootstrap();
