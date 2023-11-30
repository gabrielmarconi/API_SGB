import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnexosController } from "./anexos.controller";
import { AnexoEntity } from "./entities/anexos.entity";
import { AnexosRepository } from "./repository/anexos.repository";
import { CreateAnexoService, DeleteAnexoService, GetAnexoService, UpdateAnexoService } from "./services";

@Module({
    imports: [
        TypeOrmModule.forFeature([AnexoEntity])
    ],
    exports: [
        AnexosRepository,
        TypeOrmModule
    ],
    controllers: [
        AnexosController
    ],
    providers: [
        AnexosRepository,
        CreateAnexoService,
        DeleteAnexoService,
        GetAnexoService,
        UpdateAnexoService
    ]
})
export class AnexosModule {}