import { Module } from "@nestjs/common";
import { ArquiveService } from "./services/arquive.service";
import { ArquiveController } from "./controllers/arquive.controller";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { RabbitConfigService } from "src/queue/rabbitmq.config";

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      useClass: RabbitConfigService,
    }),
  ],
  controllers: [ArquiveController],
  providers: [ArquiveService],
})
export class ArquiveModule {}
