import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { USUARIO_CONSTANTS } from "../constants/usuarios.constants";
import { UsuarioRepository } from "../repository/usuarios.repository";

@Injectable()
export class DeleteUsuarioService {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(id: number) {
        const usuarioExclusao = await this.usuarioRepository.get().find({
            where:{'id': id}
        })
        if (usuarioExclusao.length <= 0)
            throwNotFoundError(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)
        return await this.usuarioRepository.delete('id', usuarioExclusao[0])
    }
}