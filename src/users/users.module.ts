import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userEntity } from "src/typeorm/entities/users.entity";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./service/users.service";

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([userEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
