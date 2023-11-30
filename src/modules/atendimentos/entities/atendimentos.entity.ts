import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { AtendimentoServicoEntity } from "./atendimentosServicos.entity"

@Entity('atendimentos')
export class AtendimentoEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public idCliente: number

    @Column()
    public idFuncionario: number

    @Column()
    public idFormaPagamento?: number

    @Column()
    public dataHora: Date
    
    @Column()
    public dataHoraTermino: Date

    @Column()
    public confirmado?: string
    
    @Column()
    public valorTotal?: number
    
    @Column()
    public valorDesconto?: number
    
    public servicos: Array<AtendimentoServicoEntity>   

    constructor(props?: Partial<AtendimentoEntity>) {
        Object.assign(this, props)
    }
}