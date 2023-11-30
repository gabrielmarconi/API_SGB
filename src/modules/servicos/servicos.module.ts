import { Module } from "@nestjs/common";
import { ServicoRepository } from "./repository/servicos.repository";
import { AtualizarValorServicoService, CreateServicoService, DeleteServicoService, GetServicoService, UpdateServicoService } from "./services";
import { ServicosController } from "./servicos.controller";
import { ServicoEntity } from "./entities/servicos.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExportarServicosService } from "./services/exportarServicos.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ServicoEntity])
    ],
    exports: [
        ServicoRepository,
        TypeOrmModule
    ],
    controllers: [ServicosController],
    providers: [
        ServicoRepository,
        CreateServicoService,
        GetServicoService,
        DeleteServicoService,
        UpdateServicoService,
        ExportarServicosService,
        AtualizarValorServicoService
    ]
})
export class ServicosModule {}