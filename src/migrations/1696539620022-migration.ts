import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1696539620022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT O.name
                        FROM SysObjects O
                        WHERE (O.name = 'formasPagamento')
                        )
            BEGIN
                CREATE TABLE formasPagamento (
                    id INT NOT NULL CONSTRAINT PK_formasPagamento_id PRIMARY KEY IDENTITY,
                    descricao VARCHAR(100) NOT NULL
                )
            END

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT O.name
                    FROM SysObjects O
                    WHERE (O.name = 'formasPagamento')
                    )
            BEGIN
                DROP TABLE formasPagamento
            END
        `);
    }

}
