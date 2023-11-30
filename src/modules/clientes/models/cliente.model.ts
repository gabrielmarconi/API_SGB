import { ApiProperty } from "@nestjs/swagger";

export class Cliente {
    @ApiProperty()
    id: number;

    @ApiProperty()
    idUsuario: number
    
}

export class ClienteExportacao {
    
    @ApiProperty()
    filename: string

    @ApiProperty({
        default: 'base64'
    })
    encoding: string

    @ApiProperty()
    content: string
}