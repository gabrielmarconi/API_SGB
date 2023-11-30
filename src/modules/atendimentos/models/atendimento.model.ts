import { ApiProperty } from "@nestjs/swagger";

export class Atendimento {
    @ApiProperty()
    id: number;

    @ApiProperty()
    idFuncionario: number
    
    @ApiProperty()
    idCliente: number
    
    @ApiProperty()
    idFormaPagamento: number

    @ApiProperty()
    dataHora: Date

    @ApiProperty()
    dataHoraTermino: Date

    @ApiProperty()
    confirmado: string
    
    @ApiProperty()
    valorTotal: number
    
    @ApiProperty()
    valorDesconto: number

    @ApiProperty()
    servicos: Array<AtendimentoServico>
    
}

class AtendimentoServico {
    @ApiProperty()
    idServico: number;

    @ApiProperty()
    idAtendimento: number
}

export class AtendimentoExportacao {
    
    @ApiProperty()
    filename: string

    @ApiProperty({
        default: 'base64'
    })
    encoding: string

    @ApiProperty()
    content: string
}