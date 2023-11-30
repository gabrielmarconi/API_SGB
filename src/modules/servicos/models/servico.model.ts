import { ApiProperty } from "@nestjs/swagger";

export class Servico {
    @ApiProperty()
    id: number;

    @ApiProperty()
    descricao: string

    @ApiProperty()
    valor: number

    @ApiProperty()
    duracao: number
}

export class ServicoExportacao {
    
    @ApiProperty()
    filename: string

    @ApiProperty({
        default: 'base64'
    })
    encoding: string

    @ApiProperty()
    content: string
}