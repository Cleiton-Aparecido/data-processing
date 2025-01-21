module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "database_archive",
  synchronize: false,
  logging: true,
  entities: [__dirname + "/entity/*.ts"],
  migrations: [__dirname + "/migrations/*.js"],
  cli: {
    migrationsDir: "src/typeorm/migrations",
  },
};
