import { ApiProperty } from "@nestjs/swagger"
import { Arquivo } from "./arquivo.model"

export class GetAnexoReponse {
    @ApiProperty()
    Entidade: string

    @ApiProperty()
    Chave: string

    @ApiProperty({
        type: Arquivo,
        isArray: true
    })
    Arquivos: Arquivo[]
}