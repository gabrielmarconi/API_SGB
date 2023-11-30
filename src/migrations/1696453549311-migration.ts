import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1696453549311 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT O.name
                        FROM SysObjects O
                        WHERE (O.name = 'usuarios')
                        )
            BEGIN
                CREATE TABLE usuarios (
                    id INT NOT NULL CONSTRAINT PK_Usuarios_CodigoUsuario PRIMARY KEY IDENTITY,
                    nome VARCHAR(100) NOT NULL,
                    email VARCHAR(300) NOT NULL,
                    senha VARCHAR(255) NOT NULL,
                    administrador CHAR(1) NOT NULL CONSTRAINT DF_usuarios_administrador DEFAULT('N'),
                    telefone VARCHAR(14) NULL,
                    dataNascimento DATETIME NULL
                )
            END

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT O.name
                    FROM SysObjects O
                    WHERE (O.name = 'usuarios')
                    )
            BEGIN
                DROP TABLE usuarios
            END
        `);
    }

}
