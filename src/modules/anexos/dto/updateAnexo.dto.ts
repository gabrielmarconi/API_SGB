import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class UpdateAnexoDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'ChaveTemporaria é obrigatório.' })
    ChaveTemporaria: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Entidade é obrigatório.' })
    Entidade: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Chave é obrigatório.' })
    Chave: string
}