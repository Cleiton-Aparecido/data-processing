import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Client1735865650905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "zip_code",
            type: "varchar",
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "road",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "nationality",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );

    // Criação da tabela 'client'
    await queryRunner.createTable(
      new Table({
        name: "client",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "telephone",
            type: "varchar",
          },
          {
            name: "cpf",
            type: "varchar",
          },
          {
            name: "rg",
            type: "varchar",
          },
          {
            name: "father",
            type: "varchar",
          },
          {
            name: "mother",
            type: "varchar",
          },
          {
            name: "address",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );

    // Criação da foreign key para 'address'
    await queryRunner.createForeignKey(
      "client",
      new TableForeignKey({
        columnNames: ["address"],
        referencedColumnNames: ["id"],
        referencedTableName: "address",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a foreign key
    const table = await queryRunner.getTable("client");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("address") !== -1
    );
    await queryRunner.dropForeignKey("client", foreignKey);

    // Remover as tabelas
    await queryRunner.dropTable("client");
    await queryRunner.dropTable("address");
  }
}
