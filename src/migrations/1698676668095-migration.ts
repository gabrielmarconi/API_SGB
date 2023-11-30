import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1698676668095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'atendimentos')
                             AND (C.name = 'valorTotal')
                        )
            BEGIN
                ALTER TABLE atendimentos ADD
                    valorTotal MONEY NULL
            END

            IF NOT EXISTS (SELECT C.name
                            FROM SysObjects O
                            INNER JOIN SysColumns C ON O.id = C.id
                            WHERE (O.name = 'atendimentos')
                            AND (C.name = 'valorDesconto')
                        )
            BEGIN
                ALTER TABLE atendimentos ADD
                    valorDesconto MONEY NULL
            END
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'atendimentos')
                        AND (C.name = 'valorTotal')
                    )
            BEGIN
                ALTER TABLE atendimentos
                    DROP COLUMN valorTotal
            END  
            
            IF EXISTS (SELECT C.name
                        FROM SysObjects O
                        INNER JOIN SysColumns C ON O.id = C.id
                        WHERE (O.name = 'atendimentos')
                        AND (C.name = 'valorDesconto')
                    )
            BEGIN
                ALTER TABLE atendimentos
                    DROP COLUMN valorDesconto
            END  
        `)
    }

}
