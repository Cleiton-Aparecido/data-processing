import { RabbitMQConfig } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { ConfigurableModuleOptionsFactory } from "@nestjs/common";

@Injectable()
export class RabbitConfigService
  implements ConfigurableModuleOptionsFactory<RabbitMQConfig, "create">
{
  create(): RabbitMQConfig {
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
