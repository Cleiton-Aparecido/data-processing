import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";
import { Repository } from "typeorm/repository/Repository";

import { ImportClientFromCSVUseCase } from "./use-case/importClient-usecase";
import { DataClientDto } from "../dto/dataCliente.dto";
import { promises } from "dns";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(clientEntity)
    private clientRepository: Repository<clientEntity>,
    private importClientFromCSVUseCase: ImportClientFromCSVUseCase
  ) {}

  async readFile(pathArchive) {
    Logger.log(`Lendo o arquivo ${pathArchive}`);
    try {
      return this.importClientFromCSVUseCase.execute(pathArchive);
    } catch (error) {
      throw new InternalServerErrorException("Erro ao importar o arquivo");
    }
  }

  async getClient(filterClient: DataClientDto): Promise<clientEntity> {
    try {
      const client = await this.clientRepository.findOne({
        where: filterClient,
      });
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
      const reponseUpdate = await this.clientRepository.update(id, dataClient);

      console.log(reponseUpdate);
      if (reponseUpdate.affected === 0) {
        throw new NotFoundException("Cliente não encontrado");
      }

      return await this.clientRepository.findOne({ where: { id } });
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
}
