import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('formasPagamento')
export class FormaPagamentoEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public descricao: string    

    constructor(props?: Partial<FormaPagamentoEntity>) {
        Object.assign(this, props)
    }
}