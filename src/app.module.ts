import { Module } from "@nestjs/common";
import { ArquiveModule } from "./arquive/arquive.module";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { ClientModule } from "./client/client.module";
import { ConfigModule } from "@nestjs/config";
import { RabbitConfigService } from "./queue/rabbitmq.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfigService } from "./typeorm/postgres.config.service";
import { UserModule } from "./users/users.module";
import { AuthModule } from "./auth/module.auth";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule.forRootAsync({
      useClass: RabbitConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/public",
    }),
    AuthModule,
    ClientModule,
    ArquiveModule,
    UserModule,
  ],
})
export class AppModule {}
