import { ApiProperty } from "@nestjs/swagger";

export class FormaPagamento {
    @ApiProperty()
    id: number;

    @ApiProperty()
    descricao: string
    
}

export class FormaPagamentoExportacao {
    
    @ApiProperty()
    filename: string

    @ApiProperty({
        default: 'base64'
    })
    encoding: string

    @ApiProperty()
    content: string
}