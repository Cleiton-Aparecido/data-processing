import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppDataSource } from "./typeorm/data-source";
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT);
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error( error);
  }
}
bootstrap();
