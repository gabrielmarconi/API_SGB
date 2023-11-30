import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MaxLength, MinLength, maxLength } from "class-validator"
import { IsEmailExistenteUsuario } from "../validators/verificaEmailUsuario.validator"

export class CreateUsuariosDTO {
    @IsOptional()
    public id: number

    @IsOptional()
    public idUsuario: number

    @ApiProperty()
    @IsNotEmpty({ message: 'O campo nome é obrigatório!' })
    public nome: string

    @ApiProperty()    
    @IsEmail(undefined, { message: 'O e-mail informado, não é válido!' })
    @IsEmailExistenteUsuario({ message: 'Email ja cadastrado.' })
    public email: string

    @ApiProperty()
    @IsNotEmpty({ message: 'O campo senha é obrigatório!' })
    @MinLength(6, { message: 'O campo senha precisa de no mínimo 6 caracteres.' })
    @MaxLength(16, { message: 'O campo senha deve possuir no máximo de 16 caracteres.' })
    public senha: string

    @ApiProperty()    
    @IsOptional()
    public administrador?: string

    @ApiProperty()
    @IsPhoneNumber('BR', { message: 'O telefone informado, não é válido!' })
    @IsOptional()
    public telefone?: string

    @ApiProperty()    
    @IsOptional()
    public dataNascimento?: Date
    
    @ApiProperty()    
    @IsOptional()
    public dataAlteracaoSenha?: Date

    @ApiProperty()
    @MaxLength(100, { message: 'O SMTPHost informado, deve possuir no máximo 100 caracteres.' })
    @IsOptional()
    public SMTPHost?: string

    @ApiProperty()
    @MaxLength(100, { message: 'O SMTPRemetente informado, deve possuir no máximo 100 caracteres.' })
    @IsOptional()
    public SMTPRemetente?: string
    
    @ApiProperty()    
    @IsOptional()
    public SMTPPort?: number

    @ApiProperty()
    @MaxLength(100, { message: 'O SMTPUsuario informado, deve possuir no máximo 100 caracteres.' })
    @IsOptional()
    public SMTPUsuario?: string

    @ApiProperty()
    @MaxLength(255, { message: 'O SMTPSenha informado, deve possuir no máximo 255 caracteres.' })
    @IsOptional()
    public SMTPSenha?: string

    @ApiProperty()
    @IsOptional()
    public SMTPTimeout?: number

    @ApiProperty()    
    @IsOptional()
    public SMTPConexaoSegura?: string

    @ApiProperty()    
    @IsOptional()
    public senhaProvisoria?: string

    @ApiProperty()
    @IsOptional()
    public horaInicioExpediente: string 

    @ApiProperty()
    @IsOptional()
    public horaTerminoExpediente: string 

}