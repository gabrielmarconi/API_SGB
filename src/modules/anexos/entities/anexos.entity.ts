import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Anexos')
export class AnexoEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    CodigoAnexo: string;

    @Column()
    Entidade: string

    @Column()
    Chave: string

    @Column()
    NomeArquivo: string

    @Column()
    Campo: string

    @Column({ type: "bigint" })
    CodigoOrganizacao: string;

    @Column({ type: "bigint" })
    InseridoPor: string;

    @CreateDateColumn()
    InseridoEm: Date;
}