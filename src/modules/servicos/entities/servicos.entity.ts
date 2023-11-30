import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('servicos')
export class ServicoEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public descricao: string

    @Column({ type: 'money' })
    public valor: number

    @Column()
    public duracao: number

    @Column()
    public ativo?: string   

    constructor(props?: Partial<ServicoEntity>) {
        Object.assign(this, props)
    }
}