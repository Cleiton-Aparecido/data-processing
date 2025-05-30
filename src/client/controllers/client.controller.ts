import { Controller, Get, Query } from "@nestjs/common";
import { ClientService } from "../services/client.service";
import { DataClienteDto } from "../dto/dataCliente.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("clients")
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get("getClient")
  async reportClient(@Query() query: DataClienteDto) {
    return await this.clientService.getClent(query);
  }
}
