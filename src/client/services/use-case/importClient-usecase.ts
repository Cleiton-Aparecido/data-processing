import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";
import * as fs from "fs";
import * as readline from "readline";
import { deleteFile } from "src/utils/delete-file";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ImportClientFromCSVUseCase {
  constructor(
    @InjectRepository(clientEntity)
    private clientRepository: Repository<clientEntity>
  ) {}

  private async *readCSVStream(filePath: string) {
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

  async execute(filePath: string): Promise<void> {
    try {
      for await (const record of this.readCSVStream(filePath)) {
        const client: Partial<clientEntity> = {
          name: record.name,
          telephone: record.telephone,
          email: record.email,
          cpf: record.cpf,
          rg: record.rg,
          father: record.father,
          mother: record.mother,
        };

        try {
          await this.clientRepository.save(client);
        } catch (error) {
          console.error(
            `Erro ao salvar registro: ${JSON.stringify(client)}\n`,
            error
          );
        }
      }

      deleteFile(filePath);
    } catch (error) {
      throw new InternalServerErrorException("Erro ao importar o arquivo");
    }
  }
}
