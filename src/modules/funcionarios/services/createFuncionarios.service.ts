import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { USUARIO_CONSTANTS } from "src/modules/usuarios/constants/usuarios.constants";
import { UsuarioRepository } from "src/modules/usuarios/repository/usuarios.repository";
import { CreateFuncionariosDTO } from "../dto/createFuncionarios.dto";
import { FuncionarioEntity } from "../entities/funcionarios.entity";
import { FuncionarioRepository } from "../repository/funcionarios.repository";

@Injectable()
export class CreateFuncionarioService {
    constructor(
        private funcionarioRepository: FuncionarioRepository,
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(data: CreateFuncionariosDTO): Promise<FuncionarioEntity> {
        const funcionario = new FuncionarioEntity(data)        

        // verifica se o usuario existe                
        const usuario = await this.usuarioRepository.get().find({
            where: { 'id': data.idUsuario }
        })
        if (!usuario)
            throwNotFoundError(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)

        return await this.funcionarioRepository.save(funcionario)
    }
}