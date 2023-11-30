import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class AlterarSenhaDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo emai-l é obrigatório.' })
    @IsEmail(undefined, { message: 'Não é um emai-l válido.' })
    public email: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo senha atual é obrigatório.' })
    @MinLength(6, { message: 'Campo senha precisa de no mínimo 6 caracteres.' })
    @MaxLength(16, { message: 'Campo senha deve possuir um tamanho máximo de 16 caracteres.' })
    public senhaAtual: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo nova senha é obrigatório.' })
    @MinLength(6, { message: 'Campo senha precisa de no mínimo 6 caracteres.' })
    @MaxLength(16, { message: 'Campo senha deve possuir um tamanho máximo de 16 caracteres.' })
    public novaSenha: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo confirmar senha é obrigatório.' })
    @MinLength(6, { message: 'Campo senha precisa de no mínimo 6 caracteres.' })
    @MaxLength(16, { message: 'Campo senha deve possuir um tamanho máximo de 16 caracteres.' })
    public confirmarSenha: string
}