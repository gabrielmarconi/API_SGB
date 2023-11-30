import { ApiProperty } from "@nestjs/swagger";

export class Usuario {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string

    @ApiProperty()
    email: string

    @ApiProperty()
    senha: string

    @ApiProperty()
    administrador: string
    
    @ApiProperty()
    telefone: string

    @ApiProperty()
    dataNascimento: Date
    
    @ApiProperty()
    dataAlteracaoSenha: Date

    @ApiProperty()
    SMTPHost: string

    @ApiProperty()
    SMTPRemetente: string
    
    @ApiProperty()
    SMTPPort: number

    @ApiProperty()
    SMTPUsuario: string

    @ApiProperty()
    SMTPSenha: string

    @ApiProperty()
    SMTPTimeout: number

    @ApiProperty()
    SMTPConexaoSegura: string

    @ApiProperty()
    senhaProvisoria: string

    @ApiProperty()
    horaInicioExpediente: string
    
    @ApiProperty()
    horaTerminoExpediente: string
   
}

export class UsuarioExportacao {
    
    @ApiProperty()
    filename: string

    @ApiProperty({
        default: 'base64'
    })
    encoding: string

    @ApiProperty()
    content: string
}