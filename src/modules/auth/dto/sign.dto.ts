import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignDTO {
    
    @ApiProperty()
    @IsNotEmpty({ message: 'Email é obrigatório.' })
    public email: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Senha é obrigatória.' })
    public senha: string
}