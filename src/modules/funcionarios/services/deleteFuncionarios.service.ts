import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { FUNCIONARIOS_CONSTANTS } from "../constants/funcionarios.constants";
import { FuncionarioRepository } from "../repository/funcionarios.repository";
import { UsuarioRepository } from "src/modules/usuarios/repository/usuarios.repository";
import { USUARIO_CONSTANTS } from "src/modules/usuarios/constants/usuarios.constants";

@Injectable()
export class DeleteFuncionarioService {
    constructor(
        private funcionarioRepository: FuncionarioRepository,
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(id: number) {
        let idUsuario

        const funcionario = await this.funcionarioRepository.get().findOne({
            where: { 'id': id }
        })
        if (!funcionario)
            throwNotFoundError(FUNCIONARIOS_CONSTANTS.FUNCIONARIO_NAO_ENCONTRADO)
        else {
            idUsuario = funcionario.idUsuario
        }

        const funcionarioExcluido = await this.funcionarioRepository.delete('id', funcionario)
        
        if (funcionarioExcluido) {
            const usuario = await this.usuarioRepository.get().findOne({
                where: { 'id': idUsuario }
            })
            if (!usuario) 
                throwNotFoundError(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)
            else {
                await this.usuarioRepository.delete('id', usuario)
            }
        }

        return funcionarioExcluido
    }
}