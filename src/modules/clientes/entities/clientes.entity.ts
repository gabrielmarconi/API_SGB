import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('clientes')
export class ClienteEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public idUsuario: number    

    constructor(props?: Partial<ClienteEntity>) {
        Object.assign(this, props)
    }
}