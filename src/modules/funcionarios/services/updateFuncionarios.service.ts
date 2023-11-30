import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { USUARIO_CONSTANTS } from "src/modules/usuarios/constants/usuarios.constants";
import { UsuarioRepository } from "src/modules/usuarios/repository/usuarios.repository";
import { CreateFuncionariosDTO } from "../dto/createFuncionarios.dto";
import { FuncionarioEntity } from "../entities/funcionarios.entity";
import { FuncionarioRepository } from "../repository/funcionarios.repository";
import { FUNCIONARIOS_CONSTANTS } from "../constants/funcionarios.constants";

@Injectable()
export class UpdateFuncionarioService {
    constructor(
        private funcionarioRepository: FuncionarioRepository,
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(id: number, data: CreateFuncionariosDTO) {

        const funcionarioAlteracao = await this.funcionarioRepository.get().findOne({
            where: { 'id': id }
        })
        if (!funcionarioAlteracao)
            throwNotFoundError(FUNCIONARIOS_CONSTANTS.FUNCIONARIO_NAO_ENCONTRADO)
        const funcionario = new FuncionarioEntity(data)
        funcionario.id = funcionarioAlteracao.id

        // verifica se o usuario existe                
        const usuario = await this.usuarioRepository.get().find({
            where: { 'id': id }
        })
        if (!usuario)
            throwNotFoundError(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)

        return await this.funcionarioRepository.update('id', funcionario)
    }
}