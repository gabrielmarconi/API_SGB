import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class EnviarEmailEsqueciSenhaDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo emai-l é obrigatório.' })
    @IsEmail(undefined, { message: 'Não é um emai-l válido.' })
    public email: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo emai-l confirmação é obrigatório.' })
    @IsEmail(undefined, { message: 'Não é um emai-l válido.' })
    public emailConfirmacao: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo idUsuario é obrigatório.' })
    public idUsuario: number
    
}