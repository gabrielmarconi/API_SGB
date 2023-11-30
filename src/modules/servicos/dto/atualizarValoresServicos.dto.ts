import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AtualizarValorServicoDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'É obrigatório informar o(s) serviço(s).' })    
    public servicos: Array<number>

    @ApiProperty()
    @IsNotEmpty({ message: 'É obrigatório informar o percentual.' })    
    public percentual: number

    @ApiProperty()
    @IsNotEmpty({ message: 'É obrigatório informar o tipo da atualização.' })    
    public tipoAtualizacao: string
    
}