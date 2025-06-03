import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ImportClientFromCSVUseCase } from "./use-case/importClient-usecase";
import { DataClientDto } from "../dto/dataCliente.dto";
import { clientEntity } from "src/typeorm/entities/client.entity";
import { ClientRepository } from "../repository/client.repository";

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly importClientFromCSVUseCase: ImportClientFromCSVUseCase
  ) {}

  async readFile(pathArchive: string) {
    Logger.log(`Lendo o arquivo ${pathArchive}`);
    try {
      return this.importClientFromCSVUseCase.execute(pathArchive);
    } catch (error) {
      throw new InternalServerErrorException("Erro ao importar o arquivo");
    }
  }

  async getClient(filterClient: DataClientDto): Promise<clientEntity> {
    try {
      const client = await this.clientRepository.findByFilter(filterClient);
      return client;
    } catch (error) {
      Logger.error("Erro ao buscar o cliente: ", error);
      throw new InternalServerErrorException("Erro ao buscar o cliente");
    }
  }

  async updateClient(
    id: number,
    dataClient: DataClientDto
  ): Promise<clientEntity> {
    try {
      const responseUpdate = await this.clientRepository.update(id, dataClient);

      if (responseUpdate.affected === 0) {
        throw new NotFoundException("Cliente não encontrado");
      }

      return await this.clientRepository.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      Logger.error("Erro ao atualizar dados do cliente: ", error);
      throw new InternalServerErrorException(
        "Erro ao atualizar dados do cliente"
      );
    }
  }

  async createClient(data: DataClientDto): Promise<clientEntity> {
    try {
      const newClient = await this.clientRepository.create(data);
      return await this.clientRepository.save(newClient);
    } catch (error) {
      Logger.error("Erro ao criar cliente", error);
      throw new InternalServerErrorException("Erro ao criar cliente");
    }
  }

  async deleteClient(id: number): Promise<any> {
    try {
      const result = await this.clientRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException("Cliente não encontrado");
      }
      return { message: "Cliente deletado com sucesso", statusCode: 204 };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao deletar o cliente");
    }
  }
}
