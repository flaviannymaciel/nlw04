// migration = estrutura da tabela, banco de dados sempre atualizados entre equipe
// up = criar migration -- down = remover migration
// baixar beekeper studio para testar banco
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614127096001 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
          new Table({
            name: "users",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true
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
                name: "created_at",
                type: "timestamp",
                default: "now()",
              }
            ]
          })
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}
