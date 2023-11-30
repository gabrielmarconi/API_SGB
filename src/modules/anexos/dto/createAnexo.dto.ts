import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsNotEmpty, MaxLength, ValidateNested } from "class-validator"
import { AnexoDTO } from "./anexo.dto"

export class CreateAnexoDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'Entidade é obrigatório.' })
    @MaxLength(100, { message: 'Tamanho máximo do campo Entidade é de 100.' })
    Entidade: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Chave é obrigatório.' })
    Chave: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Arquivos é obrigatório.' })
    @IsArray({ message: 'Arquivos deve ser do tipo array' })
    @ArrayNotEmpty({ message: 'Deve possui pelo menos um arquivo.' })
    @ApiProperty({
        type: AnexoDTO,
        isArray: true
    })
    @ValidateNested({ each: true })
    @Type(() => AnexoDTO)
    Arquivos: Array<AnexoDTO>
}