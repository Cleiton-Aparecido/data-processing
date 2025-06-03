import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(clientEntity)
    private clientRepository: Repository<clientEntity>
  ) {}

  async findById(id: number): Promise<clientEntity> {
    return this.clientRepository.findOne({ where: { id } });
  }

  async findByFilter(filter: Partial<clientEntity>): Promise<clientEntity> {
    return this.clientRepository.findOne({ where: filter });
  }

  async update(id: number, data: Partial<clientEntity>) {
    return this.clientRepository.update(id, data);
  }

  async save(client: clientEntity): Promise<clientEntity> {
    return await this.clientRepository.save(client);
  }

  async delete(id: number) {
    return await this.clientRepository.delete(id);
  }
  async create(data: Partial<clientEntity>): Promise<clientEntity> {
    return await this.clientRepository.create(data);
  }
}
