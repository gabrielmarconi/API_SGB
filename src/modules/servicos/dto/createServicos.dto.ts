import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsInt, isInt, isNotEmpty, IsNotEmpty, IsOptional } from "class-validator"

export class CreateServicosDTO {
    
    @ApiProperty()
    @IsNotEmpty({ message: 'O campo descrição é obrigatório!' })
    public descricao: string
    
    @ApiProperty()
    @IsNotEmpty({ message: 'O campo valor é obrigatório!' })
    public valor: number

    @ApiProperty()
    @IsNotEmpty({ message: 'O campo duração é obrigatório!' })
    @IsInt({ message: 'O campo duração deve ser um número inteiro!' })
    public duracao: number

    @ApiProperty()    
    @IsOptional()
    public ativo?: string

}