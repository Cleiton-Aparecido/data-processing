import { Controller } from "@nestjs/common";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { ClientService } from "../services/client.service";

@Controller()
export class rabbitEvent {
  constructor(private readonly clientService: ClientService) {}

  @RabbitSubscribe({
    exchange: "process-arquive",
    routingKey: "key.save-data-routing-key-client",
    queue: "down.save-data-queue",
  })
  async includeClient(pathArchive: string): Promise<void> {
    this.clientService.readFile(pathArchive);
  }
}
