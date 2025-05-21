import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1747787793046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "username", type: "varchar", isUnique: true },
          { name: "password", type: "varchar" },
          { name: "isActive", type: "boolean", default: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
