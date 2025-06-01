import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ClientService } from "../services/client.service";
import { DataClientDto } from "../dto/dataCliente.dto";
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { clientEntity } from "src/typeorm/entities/client.entity";

@ApiTags("cliente")
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOkResponse({
    description: "Cliente retornado com sucesso",
    type: DataClientDto,
    example: {
      id: 3,
      name: "Pedro Costa",
      email: "pedro.costa@email.com",
      telephone: "11977777777",
      cpf: "12345951900",
      rg: "RJ1111222",
      father: "Marcos Costa",
      mother: "Julia Costa",
      address: null,
    },
  })
  @ApiResponse({
    status: 500,
    description: "Erro ao buscar o cliente",
    example: {
      message: "Erro ao buscar o cliente",
      error: "Internal Server Error",
      statusCode: 500,
    },
  })
  @Get("getClient")
  async reportClient(@Query() query: DataClientDto): Promise<clientEntity> {
    return await this.clientService.getClient(query);
  }

  @ApiBody({
    description: "Dados do cliente a serem atualizados",
    type: DataClientDto,
    examples: {
      exemplo: {
        summary: "Exemplo de cliente",
        value: {
          name: "Pedro Costa",
          email: "pedro.costa@email.com",
          telephone: "11977777777",
          cpf: "12345951900",
          rg: "RJ1111222",
          father: "Marcos Costa",
          mother: "Julia Costa",
          address: null,
        },
      },
    },
  })
  @ApiOkResponse({
    description: "Cliente retornado com sucesso",
    type: DataClientDto,
    example: {
      id: 3,
      name: "Pedro Costa",
      email: "pedro.costa@email.com",
      telephone: "11977777777",
      cpf: "12345951900",
      rg: "RJ1111222",
      father: "Marcos Costa",
      mother: "Julia Costa",
      address: null,
    },
  })
  @ApiResponse({
    status: 500,
    description: "Erro ao buscar o cliente",
    example: {
      message: "Erro ao atualizar dados do cliente",
      error: "Internal Server Error",
      statusCode: 500,
    },
  })
  @Put("updateClient/:id")
  async updateClient(
    @Param("id") id: number,
    @Body() DataClient: DataClientDto
  ) {
    return await this.clientService.updateClient(id, DataClient);
  }
}
