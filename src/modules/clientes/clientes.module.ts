import { Module } from "@nestjs/common";
import { UsuarioRepository } from "../usuarios/repository/usuarios.repository";
import { ClientesController } from "./clientes.controller";
import { ClienteRepository } from "./repository/clientes.repository";
import { CreateClienteService, DeleteClienteService, ExportarClientesService, GetClienteService, GetListagemClientesService, UpdateClienteService } from "./services";
import { ClienteEntity } from "./entities/clientes.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosModule } from "../usuarios/usuarios.module";

@Module({
    imports: [
        UsuariosModule,
        TypeOrmModule.forFeature([ClienteEntity])
    ],
    exports: [
        ClienteRepository,
        TypeOrmModule
    ],
    controllers: [ClientesController],
    providers: [
        ClienteRepository,
        UsuarioRepository,
        CreateClienteService,
        GetClienteService,
        DeleteClienteService,
        UpdateClienteService,
        ExportarClientesService,
        GetListagemClientesService
    ]
})
export class ClientesModule {}