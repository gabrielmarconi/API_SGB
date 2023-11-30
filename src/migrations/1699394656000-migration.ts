import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1699394656000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                             AND (C.name = 'dataAlteracaoSenha')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    dataAlteracaoSenha DATETIME NULL
            END
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'dataAlteracaoSenha')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP COLUMN dataAlteracaoSenha
            END
        `)
    }

}
