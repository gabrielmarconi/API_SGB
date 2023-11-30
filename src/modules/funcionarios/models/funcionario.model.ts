import { ApiProperty } from "@nestjs/swagger";

export class Funcionario {
    @ApiProperty()
    id: number;

    @ApiProperty()
    idUsuario: number        
    
}

export class FuncionarioExportacao {
    
    @ApiProperty()
    filename: string

    @ApiProperty({
        default: 'base64'
    })
    encoding: string

    @ApiProperty()
    content: string
}