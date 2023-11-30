import { ApiProperty } from "@nestjs/swagger"

export class GetTipoUsuarioResponse {    
    
    @ApiProperty()
    tipoUsuario: string
    
}