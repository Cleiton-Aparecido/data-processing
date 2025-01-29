import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(clientEntity)
    private clientRepository: Repository<clientEntity>
  ) {}

  async readFile(createSaveDatumDto) {
    console.log(createSaveDatumDto);
    // this.clientRepository.create(createSaveDatumDto);
    // this.clientRepository.save(createSaveDatumDto);
    return "This action adds a new saveDatum";
  }
}
