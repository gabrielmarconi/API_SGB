import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ConfirmarAtendimentoDTO {    

    @ApiProperty()
    @IsNotEmpty({ message: 'É obrigatório informar a confirmação.' })    
    public confirmado: string
    
}