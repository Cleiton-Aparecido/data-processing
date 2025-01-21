import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ClientService } from './service/client.service';

@Controller()
export class rabbitEvent {
  constructor(private readonly clientService: ClientService) {}

  @RabbitSubscribe({
    exchange: 'process-arquive',
    routingKey: 'key.save-data-routing-key-client',
    queue: 'down.save-data-queue',
  })
  async includeClient(message) {
    console.log('message', message);
    return await this.clientService.readFile(message);
  }
}
