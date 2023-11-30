import { ApiProperty } from "@nestjs/swagger"

export class AuthResponse {    
    
    @ApiProperty()
    access_token: string

    @ApiProperty()
    idUsuario: number

    @ApiProperty()
    senhaProvisoria: string
    
}