import { ApiProperty } from "@nestjs/swagger"

export class GetIndicadoresTotalizadoresReponse {
    @ApiProperty()
    Modulo: string

    @ApiProperty()
    Detalhes?: string

    @ApiProperty()
    Total: number;

    @ApiProperty()
    Indicador: string;
}