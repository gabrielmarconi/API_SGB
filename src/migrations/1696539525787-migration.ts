import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1696539525787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT O.name
                        FROM SysObjects O
                        WHERE (O.name = 'funcionarios')
                        )
            BEGIN
                CREATE TABLE funcionarios (
                    id INT NOT NULL CONSTRAINT PK_funcionarios_id PRIMARY KEY IDENTITY,
                    idUsuario INT NOT NULL CONSTRAINT FK_funcionarios_idUsuario FOREIGN KEY (idUsuario) REFERENCES usuarios (id),
                )
            END

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT O.name
                    FROM SysObjects O
                    WHERE (O.name = 'funcionarios')
                    )
            BEGIN
                DROP TABLE funcionarios
            END
        `);
    }

}
