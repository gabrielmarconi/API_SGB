import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";

export class VerificaAtendimentoExistenteDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo dataInicio é obrigatório.' })    
    public dataInicio: string
    
    @ApiProperty()
    @IsNotEmpty({ message: 'Campo dataTermino é obrigatório.' })    
    public dataTermino: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Campo idFuncionario é obrigatório.' })
    public idFuncionario: number

    @ApiProperty()
    @IsOptional()
    public idAtendimento: number
}