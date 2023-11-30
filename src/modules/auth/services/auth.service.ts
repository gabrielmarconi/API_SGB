import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { throwUnauthorizedError } from "src/common/errors/unauthorized.error";
import { UsuarioRepository } from "src/modules/usuarios/repository/usuarios.repository";


@Injectable()
export class AuthService {
    constructor(
        private usuarioRepository: UsuarioRepository,        
        private jwtService: JwtService
    ) {}

    async execute(email: string, senha: string) {
        
        const usuarios = await this.usuarioRepository.get().find({
            where:{'email': email}
        })
        const usuario = usuarios.length > 0 ? usuarios[0] : undefined
        if (usuario) {
            if (!await argon2.verify(usuario.senha, senha))
                throwUnauthorizedError('Usuário ou senha inválidos.')                                   

            const payload = { username: usuario.nome, sub: usuario.id }
            return {
                access_token: await this.jwtService.signAsync(payload),
                idUsuario: usuario.id,
                senhaProvisoria: usuario.senhaProvisoria
            }
        }
        throwUnauthorizedError()
    }
}