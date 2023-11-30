import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from "class-validator"

export class CreateAtendimentosServicosDTO {    

    @IsOptional()
    public id: number

    @ApiProperty()
    @IsNotEmpty({ message: 'O campo idAtendimento é obrigatório!' })
    public idAtendimento: number

    @ApiProperty()
    @IsNotEmpty({ message: 'O campo idServico é obrigatório!' })
    public idServico: number
}