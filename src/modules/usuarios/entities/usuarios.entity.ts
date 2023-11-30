import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('usuarios')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public nome: string

    @Column()
    public email: string

    @Column()
    public senha: string

    @Column()
    public administrador?: string

    @Column()
    public telefone?: string

    @Column()
    public dataNascimento?: Date
    
    @Column()
    public dataAlteracaoSenha?: Date

    @Column()
    public SMTPHost?: string

    @Column()
    public SMTPRemetente?: string
    
    @Column()
    public SMTPPort?: number

    @Column()
    public SMTPUsuario?: string

    @Column()
    public SMTPSenha?: string

    @Column()
    public SMTPTimeout?: number

    @Column()
    public SMTPConexaoSegura?: string

    @Column()
    public senhaProvisoria?: string

    @Column()
    public horaInicioExpediente: string    
    
    @Column()
    public horaTerminoExpediente: string    

    constructor(props?: Partial<UsuarioEntity>) {
        Object.assign(this, props)
    }
}