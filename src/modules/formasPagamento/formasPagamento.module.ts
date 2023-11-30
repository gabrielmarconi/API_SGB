import { Module } from "@nestjs/common";
import { FormasPagamentoController } from "./formasPagamento.controller";
import { FormaPagamentoRepository } from "./repository/formasPagamento.repository";
import { CreateFormaPagamentoService, DeleteFormaPagamentoService, ExportarFormasPagamentoService, GetFormaPagamentoService, UpdateFormaPagamentoService } from "./services";
import { FormaPagamentoEntity } from "./entities/formasPagamento.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([FormaPagamentoEntity])
    ],
    exports: [
        FormaPagamentoRepository,
        TypeOrmModule
    ],
    controllers: [FormasPagamentoController],
    providers: [
        FormaPagamentoRepository,
        CreateFormaPagamentoService,
        GetFormaPagamentoService,
        DeleteFormaPagamentoService,
        UpdateFormaPagamentoService,
        ExportarFormasPagamentoService
    ]
})
export class FormasPagamentoModule {}