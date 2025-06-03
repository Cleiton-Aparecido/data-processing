import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ClientService } from "../services/client.service";
import { DataClientDto } from "../dto/dataCliente.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { clientEntity } from "src/typeorm/entities/client.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags("cliente")
@UseGuards(JwtAuthGuard)
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get("getClient")
  @ApiOperation({ summary: "Busca um cliente" })
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
  async reportClient(@Query() query: DataClientDto): Promise<clientEntity> {
    return await this.clientService.getClient(query);
  }

  @Put("updateClient/:id")
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
    description: "Erro ao atualizar dados do cliente",
    example: {
      message: "Erro ao atualizar dados do cliente",
      error: "Internal Server Error",
      statusCode: 500,
    },
  })
  @ApiOperation({ summary: "Atualizar dados do cliente" })
  @ApiParam({ name: "id", description: "ID do cliente" })
  async updateClient(
    @Param("id") id: number,
    @Body() DataClient: DataClientDto
  ) {
    return await this.clientService.updateClient(id, DataClient);
  }

  @Post("createClient")
  @ApiOperation({ summary: "Criar um novo cliente" })
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
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: "Cliente criado com sucesso" })
  async createClient(@Body() data: DataClientDto) {
    return await this.clientService.createClient(data);
  }

  @ApiParam({ name: "id", description: "ID do cliente" })
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Deletar um cliente pelo ID" })
  @ApiResponse({ status: 204, description: "Cliente deletado com sucesso" })
  @ApiResponse({
    status: 404,
    description: "Erro ao deletar o cliente",
    example: {
      message: "Cliente não encontrado",
      error: "Not Found",
      statusCode: 404,
    },
  })
  @ApiResponse({
    status: 500,
    description: "Erro ao deletar o cliente",
    example: {
      message: "Erro ao deletar o cliente",
      error: "Internal Server Error",
      statusCode: 500,
    },
  })
  async deleteClient(@Param("id") id: number) {
    return await this.clientService.deleteClient(id);
  }
}
