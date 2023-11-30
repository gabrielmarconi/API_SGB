import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator"

export class AnexoDTO {
    @ApiProperty()
    @IsOptional()
    @MaxLength(300, { message: 'Tamanho máximo do campo Campo é de 300.' })
    Campo: string

    @ApiProperty()
    @IsNotEmpty({ message: 'filename é obrigatório.' })
    @MaxLength(200, { message: 'Tamanho máximo do campo filename é de 200.' })
    filename: string

    @ApiProperty()
    @IsNotEmpty({ message: 'content é obrigatório.' })
    content: string

    @ApiProperty()
    @IsNotEmpty({ message: 'enconding é obrigatório.' })
    encoding: string

    @ApiProperty()
    @IsNotEmpty({ message: 'type é obrigatório.' })
    type: string
}