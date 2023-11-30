import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('funcionarios')
export class FuncionarioEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public idUsuario: number            

    constructor(props?: Partial<FuncionarioEntity>) {
        Object.assign(this, props)
    }
}