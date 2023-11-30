import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1696540528660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT O.name
                        FROM SysObjects O
                        WHERE (O.name = 'atendimentosServicos')
                        )
            BEGIN
                CREATE TABLE atendimentosServicos (
                    id INT NOT NULL CONSTRAINT PK_atendimentosServicos_id PRIMARY KEY IDENTITY,
                    idAtendimento INT NOT NULL CONSTRAINT FK_atendimentosServicos_idAtendimento FOREIGN KEY (idAtendimento) REFERENCES atendimentos (id) ON DELETE CASCADE,
                    idServico INT NOT NULL CONSTRAINT FK_atendimentosServicos_idServico FOREIGN KEY (idServico) REFERENCES servicos (id)
                )
            END

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT O.name
                    FROM SysObjects O
                    WHERE (O.name = 'atendimentosServicos')
                    )
            BEGIN
                DROP TABLE atendimentosServicos
            END
        `);
    }

}
