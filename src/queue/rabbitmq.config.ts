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
          options: { durable: true },
        },
      ],
      uri: process.env.RABBITMQ_URI,
      prefetchCount: 1,
      connectionInitOptions: {
        wait: false,
      },
    };
  }
}
