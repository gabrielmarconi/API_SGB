import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1696540226865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {        
        await queryRunner.query(`
            IF NOT EXISTS (SELECT O.name
                        FROM SysObjects O
                        WHERE (O.name = 'atendimentos')
                        )
            BEGIN
                CREATE TABLE atendimentos (
                    id INT NOT NULL CONSTRAINT PK_atendimentos_id PRIMARY KEY IDENTITY,
                    idCliente INT NOT NULL CONSTRAINT FK_atendimentos_idCliente FOREIGN KEY (idCliente) REFERENCES clientes (id),
                    idFuncionario INT NOT NULL CONSTRAINT FK_atendimentos_idFuncionario FOREIGN KEY (idFuncionario) REFERENCES funcionarios (id),
                    idFormaPagamento INT NOT NULL CONSTRAINT FK_atendimentos_idFormaPagamento FOREIGN KEY (idFormaPagamento) REFERENCES formasPagamento (id),
                    dataHora DATETIME NOT NULL,
                    confirmado CHAR(1) NOT NULL CONSTRAINT DF_atendimentos_confirmado DEFAULT('N') 
                )
            END

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            IF EXISTS (SELECT O.name
                    FROM SysObjects O
                    WHERE (O.name = 'atendimentos')
                    )
            BEGIN
                DROP TABLE atendimentos
            END
        `);
    }

}
