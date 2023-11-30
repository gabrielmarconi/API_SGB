import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('atendimentosServicos')
export class AtendimentoServicoEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public idAtendimento: number

    @Column()
    public idServico: number

    constructor(props?: Partial<AtendimentoServicoEntity>) {
        Object.assign(this, props)
    }
}