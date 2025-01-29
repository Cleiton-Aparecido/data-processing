import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<string>("DB_CONNECTION") as
        | "postgres"
        | "mysql"
        | "mariadb",
      host: this.configService.get<string>("DB_HOST"),
      port: Number(this.configService.get<number>("DB_PORT")),
      username: this.configService.get<string>("DB_USERNAME"),
      password: this.configService.get<string>("DB_PASSWORD"),
      database: this.configService.get<string>("DB_DATABASE"),
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      migrations: [],
    };
  }
}
