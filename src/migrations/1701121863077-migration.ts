import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1701121863077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            IF NOT EXISTS (SELECT C.name
                FROM SysObjects O
                INNER JOIN SysColumns C ON O.id = C.id
                WHERE (O.name = 'usuarios')
                AND (C.name = 'horaInicioExpediente')
            )
            BEGIN
                ALTER TABLE usuarios ADD  horaInicioExpediente VARCHAR(4) NULL
            END

            IF NOT EXISTS (SELECT C.name
                FROM SysObjects O
                INNER JOIN SysColumns C ON O.id = C.id
                WHERE (O.name = 'usuarios')
                AND (C.name = 'horaTerminoExpediente')
            )
            BEGIN
                ALTER TABLE usuarios ADD  horaTerminoExpediente VARCHAR(4) NULL
            END

            IF NOT EXISTS (SELECT C.name
                FROM SysObjects O
                INNER JOIN SysColumns C ON O.id = C.id
                WHERE (O.name = 'atendimentos')
                AND (C.name = 'dataHoraTermino')
            )
            BEGIN
                ALTER TABLE atendimentos ADD  dataHoraTermino DATETIME NOT NULL
            END
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(` 
            IF EXISTS (SELECT C.name
                FROM SysObjects O
                INNER JOIN SysColumns C ON O.id = C.id
                WHERE (O.name = 'usuarios')
                AND (C.name = 'horaInicioExpediente')
            )
            BEGIN                
                ALTER TABLE usuarios DROP COLUMN  horaInicioExpediente 
            END

            IF EXISTS (SELECT C.name
                FROM SysObjects O
                INNER JOIN SysColumns C ON O.id = C.id
                WHERE (O.name = 'usuarios')
                AND (C.name = 'horaTerminoExpediente')
            )
            BEGIN                
                ALTER TABLE usuarios DROP COLUMN  horaTerminoExpediente 
            END

            IF EXISTS (SELECT C.name
                FROM SysObjects O
                INNER JOIN SysColumns C ON O.id = C.id
                WHERE (O.name = 'atendimentos')
                AND (C.name = 'dataHoraTermino')
            )
            BEGIN                
                ALTER TABLE atendimentos DROP COLUMN  dataHoraTermino 
            END
        `)
    }

}
