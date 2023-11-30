import { ApiProperty } from "@nestjs/swagger"

export class VerificaAtendimentoExistenteResponse {    

    @ApiProperty()
    MensagemErro: string
    
}