import * as crypto from "crypto";

if (!(global as any).crypto) {
  (global as any).crypto = crypto;
}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  Logger.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
}
bootstrap();
