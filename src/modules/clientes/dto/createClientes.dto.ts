import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateClientesDTO {    

    @IsOptional()
    public id: number

    @ApiProperty()
    @IsNotEmpty({ message: 'O campo idUsuario é obrigatório!' })
    public idUsuario: number    

}