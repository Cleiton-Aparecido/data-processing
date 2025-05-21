require('dotenv').config();

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: true,
  entities: [__dirname + "/entity/*.ts"],
  migrations: [__dirname + "/migrations/*.js"],
  cli: {
    migrationsDir: "src/typeorm/migrations",
  },
};
