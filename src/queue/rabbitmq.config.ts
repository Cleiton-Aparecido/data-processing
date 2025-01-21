import { RabbitMQConfig } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RabbitConfigService {
  async createModuleConfig(): Promise<RabbitMQConfig> {
    return {
      exchanges: [
        {
          name: "process-arquive",
          type: "topic",
        },
      ],
      uri: process.env.RABBIT_MQ || "amqp://guest:guest@localhost:5672",
      prefetchCount: 1,
      connectionInitOptions: {
        wait: false,
      },
    };
  }
}
