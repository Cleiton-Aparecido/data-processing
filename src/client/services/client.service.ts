import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";
import { Repository } from "typeorm/repository/Repository";
import * as fs from "fs";
import * as readline from "readline";
import { deleteFile } from "src/utils/delete-file";
import { ImportClientFromCSVUseCase } from "./use-case/importClient-usecase";

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

  async getClent(query) {
    return query;
  }
}
