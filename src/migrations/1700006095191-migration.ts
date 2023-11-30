import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1700006095191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                             AND (C.name = 'SMTPHost')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    SMTPHost VARCHAR(100) NULL
            END

            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                            AND (C.name = 'SMTPRemetente')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    SMTPRemetente VARCHAR(100) NULL
            END

            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                            AND (C.name = 'SMTPPort')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    SMTPPort INT NULL
            END

            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                            AND (C.name = 'SMTPUsuario')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    SMTPUsuario VARCHAR(100) NULL
            END

            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                            AND (C.name = 'SMTPSenha')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    SMTPSenha VARCHAR(255) NULL
            END

            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                            AND (C.name = 'SMTPTimeout')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    SMTPTimeout INT NULL
            END

            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                            AND (C.name = 'SMTPConexaoSegura')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    SMTPConexaoSegura CHAR(1) NOT NULL CONSTRAINT DF_usuarios_SMTPConexaoSegura DEFAULT('N') 
            END

            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'usuarios')
                            AND (C.name = 'senhaProvisoria')
                        )
            BEGIN
                ALTER TABLE usuarios ADD
                    senhaProvisoria CHAR(1) NOT NULL CONSTRAINT DF_usuarios_senhaProvisoria DEFAULT('N') 
            END
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'SMTPHost')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP COLUMN SMTPHost
            END

            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'SMTPRemetente')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP COLUMN SMTPRemetente
            END

            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'SMTPPort')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP COLUMN SMTPPort
            END

            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'SMTPUsuario')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP COLUMN SMTPUsuario
            END

            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'SMTPSenha')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP COLUMN SMTPSenha
            END

            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'SMTPTimeout')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP COLUMN SMTPTimeout
            END
            
            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'SMTPConexaoSegura')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP CONSTRAINT DF_usuarios_SMTPConexaoSegura
                    DROP COLUMN SMTPConexaoSegura
            END

            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'usuarios')
                        AND (C.name = 'senhaProvisoria')
                    )
            BEGIN
                ALTER TABLE usuarios
                    DROP CONSTRAINT DF_usuarios_senhaProvisoria
                    DROP COLUMN senhaProvisoria
            END
        `)
    }

}
