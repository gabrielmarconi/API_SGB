import { ApiProperty } from "@nestjs/swagger"

export class Arquivo {
    @ApiProperty()
    CodigoAnexo: string

    @ApiProperty()
    filename: string

    @ApiProperty()
    type: string

    @ApiProperty({
        default: 'base64'
    })
    encoding: string

    @ApiProperty()
    content: string
}