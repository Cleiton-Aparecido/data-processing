import { forwardRef, Module } from "@nestjs/common";
import { rabbitEvent } from "./rabbit.event";
import { ClientService } from "./service/client.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { clientEntity } from "src/typeorm/entities/client.entity";
import { ClientImpl } from "src/typeorm/database/client-impl";
import { DataSource } from "typeorm";

const index = {
  provide: ClientImpl,
  useFactory: (dataSource: DataSource) => {
    return new ClientImpl(dataSource.getRepository(clientEntity));
  },
  inject: [DataSource],
};

@Module({
  imports: [
    forwardRef(() => ClientModule),
    TypeOrmModule.forFeature([clientEntity]),
  ],
  controllers: [],
  providers: [ClientService, rabbitEvent, index],
})
export class ClientModule {}
