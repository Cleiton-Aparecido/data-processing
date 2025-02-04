import { InjectRepository } from "@nestjs/typeorm";
import { ClientRepository } from "../repository/client-repository";
import { clientEntity } from "../entities/client.entity";
import { Repository } from "typeorm";

export class ClientImpl implements ClientRepository {
  constructor(
    @InjectRepository(clientEntity)
    private readonly transactionRepository: Repository<clientEntity>
  ) {}
  create(client: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  get(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  save(client: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(client: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
