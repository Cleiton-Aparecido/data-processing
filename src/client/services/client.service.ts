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

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(clientEntity)
    private clientRepository: Repository<clientEntity>
  ) {}

  async *readCSVStream(filePath: string) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let isFirstLine = true;
    let headers: string[] = [];

    for await (const line of rl) {
      if (isFirstLine) {
        headers = line.split(",").map((header) => header.trim());
        isFirstLine = false;
        continue;
      }

      const values = line.split(",").map((value) => value.trim());
      const jsonObject = headers.reduce(
        (obj, header, index) => {
          obj[header] = values[index] || null;
          return obj;
        },
        {} as Record<string, string | null>
      );

      yield jsonObject;
    }
  }

  async readFile(pathArchive) {
    Logger.log(`Lendo o arquivo ${pathArchive}`);
    try {
      await this.readCSVStream(pathArchive);

      for await (const dataArchive of this.readCSVStream(pathArchive)) {
        const data: Partial<clientEntity> = {
          name: dataArchive.name,
          telephone: dataArchive.telephone,
          email: dataArchive.email,
          cpf: dataArchive.cpf,
          rg: dataArchive.rg,
          father: dataArchive.father,
          mother: dataArchive.mother,
        };

        try {
          await this.clientRepository.save(data);
        } catch (error) {
          console.error(
            `Erro ao salvar registro: ${JSON.stringify(data)}\n`,
            error
          );
        }
      }
      deleteFile(pathArchive);
    } catch (error) {
      throw new InternalServerErrorException("Erro ao importar o arquivo");
    }
  }
}
