import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "../entities/usuarios.entity";
import { UsuarioRepository } from "../repository/usuarios.repository";
import { UpdateUsuariosDTO } from "../dto/updateUsuarios.dto";
import { throwNotFoundError } from "src/common/errors";
import { USUARIO_CONSTANTS } from "../constants/usuarios.constants";
import criptografar from "src/shared/criptografar";

@Injectable()
export class UpdateUsuarioService {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(id: number, data: UpdateUsuariosDTO) {
        const usuarioAlteracao = await this.usuarioRepository.get().findOne({
            where:{'id': id}
        })
        if (!usuarioAlteracao)
            throwNotFoundError(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)
        const usuario = new UsuarioEntity(data)
        delete usuario.senha
        usuario.id = usuarioAlteracao.id        
        usuario.SMTPSenha = criptografar(data.SMTPSenha)        
        return await this.usuarioRepository.update('id', usuario)
    }
}