import { Module } from "@nestjs/common";
import { ClienteRepository } from "../clientes/repository/clientes.repository";
import { FormaPagamentoRepository } from "../formasPagamento/repository/formasPagamento.repository";
import { FuncionarioRepository } from "../funcionarios/repository/funcionarios.repository";
import { AtendimentosController } from "./atendimentos.controller";
import { AtendimentoRepository } from "./repository/atendimentos.repository";
import { ConcederDescontoAtendimentoService, CreateAtendimentoService, CreateAtendimentoServicoService, DeleteAtendimentoService, DeleteAtendimentoServicoService, GetAtendimentoService, GetListagemAtendimentosService, UpdateAtendimentoService, UpdateAtendimentoServicoService, VerificaAtendimentoExistenteService } from "./services";
import { AtendimentoServicoRepository } from "./repository/atendimentosServicos.repository";
import { ServicoRepository } from "../servicos/repository/servicos.repository";
import { AtendimentoEntity } from "./entities/atendimentos.entity";
import { AtendimentoServicoEntity } from "./entities/atendimentosServicos.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfirmarAtendimentoService } from "./services/confirmarAtendimentos.service";
import { ClientesModule } from "../clientes/clientes.module";
import { FuncionariosModule } from "../funcionarios/funcionarios.module";
import { ServicosModule } from "../servicos/servicos.module";
import { FormasPagamentoModule } from "../formasPagamento/formasPagamento.module";
import { ExportarAtendimentosService } from "./services/exportarAtendimentos.service";
import { GetListagemAtendimentosServicosService } from "./services/getListagemAtendimentosServicos.service";

@Module({
    imports: [
        ClientesModule,
        FuncionariosModule,
        ServicosModule,
        FormasPagamentoModule,
        TypeOrmModule.forFeature([AtendimentoEntity, AtendimentoServicoEntity])
    ],
    exports: [
        AtendimentoRepository,
        AtendimentoServicoRepository,
        TypeOrmModule
    ],
    controllers: [AtendimentosController],
    providers: [
        AtendimentoRepository,
        ClienteRepository,
        FuncionarioRepository,
        FormaPagamentoRepository,
        CreateAtendimentoService,
        GetAtendimentoService,
        DeleteAtendimentoService,
        UpdateAtendimentoService,
        AtendimentoServicoRepository,
        ServicoRepository,
        CreateAtendimentoServicoService,
        DeleteAtendimentoServicoService,
        UpdateAtendimentoServicoService,
        ConfirmarAtendimentoService,
        ExportarAtendimentosService,
        ConcederDescontoAtendimentoService,
        GetListagemAtendimentosService,
        GetListagemAtendimentosServicosService,
        VerificaAtendimentoExistenteService
    ]
})
export class AtendimentosModule {}