import { forwardRef, Module } from "@nestjs/common";
import { rabbitEvent } from "./controllers/rabbit.event";
import { ClientService } from "./services/client.service";
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
