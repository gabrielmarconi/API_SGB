import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1696539352716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT O.name
                        FROM SysObjects O
                        WHERE (O.name = 'servicos')
                        )
            BEGIN
                CREATE TABLE servicos (
                    id INT NOT NULL CONSTRAINT PK_servicos_id PRIMARY KEY IDENTITY,
                    descricao VARCHAR(100) NOT NULL,
                    valor MONEY NOT NULL,
                    duracao INT NOT NULL,
                    ativo CHAR(1) NOT NULL CONSTRAINT DF_servicos_ativo DEFAULT('S')
                )
            END

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT O.name
                    FROM SysObjects O
                    WHERE (O.name = 'servicos')
                    )
            BEGIN
                DROP TABLE servicos
            END
        `);
    }

}
