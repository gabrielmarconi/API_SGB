import { Injectable } from "@nestjs/common";
import { CreateUsuariosDTO } from "../dto/createUsuarios.dto";
import { UsuarioEntity } from "../entities/usuarios.entity";
import { UsuarioRepository } from "../repository/usuarios.repository";
import * as argon2 from "argon2";
import { IParametersRequest } from "src/core/interfaces/IParametersRequest.interface";
import criptografar from "src/shared/criptografar";

@Injectable()
export class CreateUsuarioService {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(data: CreateUsuariosDTO): Promise<UsuarioEntity> {
        const usuario = new UsuarioEntity(data)
        usuario.senha = await argon2.hash(data.senha)
        usuario.SMTPSenha = criptografar(data.SMTPSenha)
        return await this.usuarioRepository.save(usuario)
    }
}