import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1696540156833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT O.name
                        FROM SysObjects O
                        WHERE (O.name = 'clientes')
                        )
            BEGIN
                CREATE TABLE clientes (
                    id INT NOT NULL CONSTRAINT PK_clientes_id PRIMARY KEY IDENTITY,
                    idUsuario INT NOT NULL CONSTRAINT FK_clientes_idUsuario FOREIGN KEY (idUsuario) REFERENCES usuarios (id),
                )
            END

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT O.name
                    FROM SysObjects O
                    WHERE (O.name = 'clientes')
                    )
            BEGIN
                DROP TABLE clientes
            END
        `);
    }

}
