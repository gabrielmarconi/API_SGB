import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { USUARIO_CONSTANTS } from "src/modules/usuarios/constants/usuarios.constants";
import { UsuarioRepository } from "src/modules/usuarios/repository/usuarios.repository";
import { CreateClientesDTO } from "../dto/createClientes.dto";
import { ClienteEntity } from "../entities/clientes.entity";
import { ClienteRepository } from "../repository/clientes.repository";
import { CLIENTES_CONSTANTS } from "../constants/clientes.constants";

@Injectable()
export class UpdateClienteService {
    constructor(
        private clienteRepository: ClienteRepository,
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(id: number, data: CreateClientesDTO) {

        const clienteAlteracao = await this.clienteRepository.get().findOne({
            where: { 'id': id }
        })
        if (!clienteAlteracao)
            throwNotFoundError(CLIENTES_CONSTANTS.CLIENTE_NAO_ENCONTRADO)
        const cliente = new ClienteEntity(data)
        cliente.id = clienteAlteracao.id

        // verifica se o usuario existe                
        const usuario = await this.usuarioRepository.get().find({
            where: { 'id': data.idUsuario }
        })
        if (!usuario)
            throwNotFoundError(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)

        return await this.clienteRepository.update('id', cliente)
    }
}