import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { AppModule } from '../src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  await app.listen(process.env.PORT);
}
bootstrap();
