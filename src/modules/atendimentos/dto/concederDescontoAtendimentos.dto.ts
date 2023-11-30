import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ConcederDescontoAtendimentoDTO {    

    @ApiProperty()
    @IsNotEmpty({ message: 'É obrigatório informar o desconto.' })    
    public valorDesconto: number
    
}