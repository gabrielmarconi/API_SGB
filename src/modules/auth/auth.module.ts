import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { JWT_CONSTANTS } from "./constants/jwt.constants";
import { AuthGuard } from "./guard/auth.guard";
import { AuthService, GetTipoUsuarioService } from "./services";
import { UsuariosModule } from "../usuarios/usuarios.module";
import { ClientesModule } from "../clientes/clientes.module";
import { FuncionariosModule } from "../funcionarios/funcionarios.module";
import { ClienteRepository } from "../clientes/repository/clientes.repository";
import { FuncionarioRepository } from "../funcionarios/repository/funcionarios.repository";
import { UsuarioRepository } from "../usuarios/repository/usuarios.repository";

@Module({
    imports: [
        UsuariosModule,
        ClientesModule,
        FuncionariosModule,
        JwtModule.register({
            global: true,
            secret: JWT_CONSTANTS.secret,
            signOptions: {
                expiresIn: JWT_CONSTANTS.expiresIn
            }
        })
    ],
    exports: [
        AuthGuard
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthGuard,
        GetTipoUsuarioService,
        UsuarioRepository,
        ClienteRepository,
        FuncionarioRepository                
    ]
})
export class AuthModule {}