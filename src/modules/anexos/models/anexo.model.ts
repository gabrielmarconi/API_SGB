import { ApiProperty } from "@nestjs/swagger";

export class Anexo {
    @ApiProperty()
    CodigoAnexo: string;

    @ApiProperty()
    Entidade: string

    @ApiProperty()
    Chave: string

    @ApiProperty()
    NomeArquivo: string

    @ApiProperty()
    Campo: string

    @ApiProperty()
    CodigoOrganizacao: string;

    @ApiProperty()
    InseridoPor: string;

    @ApiProperty()
    InseridoEm: Date;
}