import { Module, forwardRef } from "@nestjs/common";
import { UsuarioRepository } from "./repository/usuarios.repository";
import { AlterarSenhaService, CreateUsuarioService, DeleteUsuarioService, EnviarEmailEsqueciSenhaService, ExportarUsuariosService, GetUsuarioService, UpdateUsuarioService, UsuarioEsqueciSenhaService } from "./services";
import { UsuariosController } from "./usuarios.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./entities/usuarios.entity";
import { EmailProvider } from "src/infra/providers/NodemailerProvider/implementations/EmailProvider";
import { FuncionarioRepository } from "../funcionarios/repository/funcionarios.repository";
import { FuncionarioEntity } from "../funcionarios/entities/funcionarios.entity";
import { EmailUnicoUsuarioConstraint } from "./validators/verificaEmailUsuario.validator";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuarioEntity,
            FuncionarioEntity
        ]),
    ],
    exports: [
        UsuarioRepository,        
        TypeOrmModule
    ],
    controllers: [UsuariosController],
    providers: [
        FuncionarioRepository,
        UsuarioRepository,
        CreateUsuarioService,
        GetUsuarioService,
        DeleteUsuarioService,        
        UpdateUsuarioService,        
        AlterarSenhaService,
        ExportarUsuariosService,  
        EnviarEmailEsqueciSenhaService,         
        UsuarioEsqueciSenhaService,
        EmailProvider,   
        EmailUnicoUsuarioConstraint 
    ]
})
export class UsuariosModule {}