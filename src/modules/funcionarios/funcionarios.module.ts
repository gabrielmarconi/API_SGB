import { Module, forwardRef } from "@nestjs/common";
import { UsuarioRepository } from "../usuarios/repository/usuarios.repository";
import { FuncionariosController } from "./funcionarios.controller";
import { FuncionarioRepository } from "./repository/funcionarios.repository";
import { CreateFuncionarioService, DeleteFuncionarioService, ExportarFuncionariosService, GetFuncionarioService, GetListagemFuncionariosService, UpdateFuncionarioService } from "./services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FuncionarioEntity } from "./entities/funcionarios.entity";
import { UsuariosModule } from "../usuarios/usuarios.module";

@Module({
    imports: [        
        UsuariosModule, 
        TypeOrmModule.forFeature([FuncionarioEntity])        
    ],
    exports: [
        FuncionarioRepository,                        
        TypeOrmModule
    ],
    controllers: [FuncionariosController],
    providers: [        
        FuncionarioRepository,                        
        UsuarioRepository,
        CreateFuncionarioService,
        GetFuncionarioService,
        DeleteFuncionarioService,
        UpdateFuncionarioService,
        ExportarFuncionariosService,
        GetListagemFuncionariosService        
    ]
})
export class FuncionariosModule {}