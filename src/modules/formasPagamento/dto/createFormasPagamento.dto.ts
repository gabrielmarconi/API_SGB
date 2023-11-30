import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateFormasPagamentoDTO {
    
    @ApiProperty()
    @IsNotEmpty({ message: 'O campo descrição é obrigatório!' })
    public descricao: string

}