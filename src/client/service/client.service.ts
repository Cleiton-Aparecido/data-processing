import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";
import { Repository } from "typeorm/repository/Repository";
import * as fs from "fs";
import * as readline from "readline";

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
    await this.readCSVStream(pathArchive);

    for await (const x of this.readCSVStream(pathArchive)) {
      console.log(x);
    }

    console.log("This action adds a new saveDatum");
    // this.clientRepository.create(createSaveDatumDto);
    // this.clientRepository.save(createSaveDatumDto);
    return "This action adds a new saveDatum";
  }
}
