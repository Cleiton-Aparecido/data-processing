import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // seu usuário do banco
  password: "1234", // sua senha do banco
  database: "database_archive", // nome do banco de dados
  synchronize: false, // Deve ser false em produção
  logging: true, // Para mostrar as queries no terminal
  entities: [__dirname + "/entity/*.ts"], // Certifique-se de que aponta para suas entidades
  migrations: [__dirname + "/migrations/*.js"], // Certifique-se de que aponta para suas migrations
  subscribers: [],
});
