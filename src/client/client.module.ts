import { forwardRef, Module } from "@nestjs/common";
import { rabbitEvent } from "./rabbit.event";
import { ClientService } from "./service/client.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";

@Module({
  imports: [
    forwardRef(() => ClientModule),
    TypeOrmModule.forFeature([clientEntity]),
  ],
  controllers: [],
  providers: [ClientService, rabbitEvent],
})
export class ClientModule {}
