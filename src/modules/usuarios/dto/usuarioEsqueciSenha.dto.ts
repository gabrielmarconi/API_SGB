import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UsuarioEsqueciSenhaDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo emai-l é obrigatório.' })
    @IsEmail(undefined, { message: 'Não é um emai-l válido.' })
    public email: string
    
}