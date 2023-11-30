import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { USUARIO_CONSTANTS } from "src/modules/usuarios/constants/usuarios.constants";
import { UsuarioRepository } from "src/modules/usuarios/repository/usuarios.repository";
import { CreateClientesDTO } from "../dto/createClientes.dto";
import { ClienteEntity } from "../entities/clientes.entity";
import { ClienteRepository } from "../repository/clientes.repository";

@Injectable()
export class CreateClienteService {
    constructor(
        private clienteRepository: ClienteRepository,
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(data: CreateClientesDTO): Promise<ClienteEntity> {
        const cliente = new ClienteEntity(data)        

        // verifica se o usuario existe                
        const usuario = await this.usuarioRepository.get().find({
            where: { 'id': data.idUsuario }
        })
        if (!usuario)
            throwNotFoundError(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)

        return await this.clienteRepository.save(cliente)
    }
}