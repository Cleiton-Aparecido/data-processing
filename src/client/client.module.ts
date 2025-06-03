import { forwardRef, Module } from "@nestjs/common";
import { rabbitEvent } from "./controllers/rabbit.event";
import { ClientService } from "./services/client.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";
import { ClientController } from "./controllers/client.controller";
import { ImportClientFromCSVUseCase } from "./services/use-case/importClient-usecase";
import { ClientRepository } from "./repository/client.repository";

@Module({
  imports: [
    forwardRef(() => ClientModule),
    TypeOrmModule.forFeature([clientEntity]),
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    ImportClientFromCSVUseCase,
    ClientRepository,
    rabbitEvent,
  ],
})
export class ClientModule {}
