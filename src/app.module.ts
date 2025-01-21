import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArquiveModule } from "./arquive/arquive.module";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { ClientModule } from "./client/client.module";
import { ConfigModule } from "@nestjs/config";
import { RabbitConfigService } from "./queue/rabbitmq.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfigService } from "./typeorm/postgres.config.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: RabbitConfigService,
    }),
    ClientModule,
    ArquiveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
