import { IsNotEmpty, IsOptional } from "class-validator"
import { AtendimentoServicoEntity } from "../entities/atendimentosServicos.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAtendimentosDTO {    

    @IsOptional()
    public id: number

    @ApiProperty()    
    @IsNotEmpty({ message: 'É obrigatório a inserção de um cliente!' })
    public idCliente: number

    @ApiProperty()    
    @IsNotEmpty({ message: 'É obrigatório a inserção de um funcionário!' })
    public idFuncionario: number

    @ApiProperty()    
    @IsOptional()
    public idFormaPagamento?: number

    @ApiProperty()    
    @IsNotEmpty({ message: 'É obrigatório a inserção de uma data!' })    
    public dataHora: Date

    @ApiProperty()    
    @IsNotEmpty({ message: 'É obrigatório a inserção de uma data!' })    
    public dataHoraTermino: Date

    @ApiProperty()        
    @IsOptional()
    public confirmado?: string

    @ApiProperty()        
    @IsOptional()
    public valorTotal?: number
    
    @ApiProperty()        
    @IsOptional()
    public valorDesconto?: number

    @ApiProperty()    
    @IsNotEmpty({ message: 'É obrigatório a inserção de um serviço!' })
    public servicos: Array<AtendimentoServicoEntity>

}