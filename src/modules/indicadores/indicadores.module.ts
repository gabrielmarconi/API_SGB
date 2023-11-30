import { Module } from "@nestjs/common";
import { IndicadoresController } from "./indicadores.controller";
import { GetIndicadoresTotalizadoresService } from "./services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IndicadoresRepository } from "./repository/indicadores.repository";
import { UsuarioEntity } from "../usuarios/entities/usuarios.entity";
import { IndicadorEntity } from "./entities/indicadores.entity";

@Module({
    imports: [  
        TypeOrmModule.forFeature([IndicadorEntity])              
    ],
    exports: [ 
        IndicadoresRepository,
        TypeOrmModule        
    ],
    controllers: [IndicadoresController],
    providers: [
        IndicadoresRepository,
        GetIndicadoresTotalizadoresService        
    ]
})
export class IndicadoresModule {}