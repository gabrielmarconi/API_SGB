import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator"

export class DeleteAnexoDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Entidade é obrigatório.' })
    @MaxLength(100, { message: 'Tamanho máximo do campo Entidade é de 100.' })
    Entidade: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Chave é obrigatório.' })
    Chave: string

    @ApiProperty()
    @IsOptional()
    CodigoAnexo: string
}